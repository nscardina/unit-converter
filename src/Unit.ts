import Load from "./Load"
import Fraction, { parseExpression } from "ts-fraction"
/**
 * Type that holds the data needed to represent a unit.
 */
export type Unit = {
    /**
     * Full name of the unit.
     */
    readonly fullName: string,
    /**
     * Abbreviation of the unit's name.
     */
    readonly abbreviation: string,
    /**
     * Conversion factor expressing how many of this unit are needed to equal one of the primary unit of this 
     * unit's {@linkcode UnitCategory}.
     */
    readonly factor: Fraction
}

/**
 * Type that represents a category of units - a group of units which are all related in some way. The 
 * {@linkcode Unit.factor factor} field of each unit must be relative to the `primaryUnit` of this 
 * `UnitCategory`.
 */
export type UnitCategory = {
    /**
     * `Unit` which all other units' `factor` fields convert measurements to.
     */
    readonly primaryUnit: Unit,
    /**
     * Name to display in menus to represent this category.
     */
    readonly name: string,
    /**
     * Array of `Unit`s in this `UnitCategory`.
     */
    readonly units: Readonly<Unit[]>,
    /**
     * Conversion factor from the primary unit of this `UnitCategory` to the primary unit of the 
     * {@linkcode UnitType.primaryUnitCategory primaryUnitCategory} of this `UnitCategory`'s 
     * `UnitType`. This factor expresses how many of the primary unit of this `UnitCategory` are 
     * needed to equal one of the primary unit of this `UnitCategory`'s `UnitType`'s 
     * `primaryUnitCategory.
     */
    readonly factor: Fraction
}

/**
 * Type that represents a broad type of units - for example, length, time or speed.
 */
export type UnitType = {
    /**
     * `UnitCategory` whose `primaryUnit` is the one which all categories' 
     * {@linkcode UnitCategory.factor factor} fields convert to.
     */
    readonly primaryUnitCategory: UnitCategory,
    /**
     * `Unit` to be used as the default unit 1 (displayed on the left dropdown).
     */
    readonly unit1: Unit,
    /**
     * `Unit` to be used as the default unit 2 (displayed on the right dropdown).
     */
    readonly unit2: Unit,
    /**
     * All `UnitCategory` objects in this `UnitType`.
     */
    readonly categories: Readonly<UnitCategory[]>
}

/**
 * Type of the {@linkcode Units} variable after being unwrapped from its `Promise`.
 */
export type UnitsType = {
    [key: string]: UnitType | undefined
}

/**
 * Parses a JSON object representing a {@linkcode Unit}, returning the object if successful and 
 * throwing an error if not.
 * @param {any} jsonInput JSON to parse into a `Unit`.
 * @returns the resulting `Unit` object.
 */
const parseUnit = (jsonInput: any): Unit => {
    if (typeof(jsonInput.fullName) === 'string' && 
        typeof(jsonInput.abbreviation) === 'string' &&
        typeof(jsonInput.factor) === 'string') {
        return Object.freeze({
            fullName: Object.freeze(jsonInput.fullName),
            abbreviation: Object.freeze(jsonInput.abbreviation),
            factor: Object.freeze(parseExpression(jsonInput.factor))
        })
    } else {
        throw new Error(`Error: ${jsonInput.toString()} does not contain the correct fields to become a Unit`)
    }
} 

/**
 * Loads and parses a `.json` file representing a {@linkcode UnitCategory}, returning the object if successful 
 * and throwing an error if not.
 * @param {string} unitTypeName name of the {@linkcode UnitType} that this `UnitCategory` belongs to.
 * @param {string} unitCategoryName name of this `UnitCategory`.
 * @param {Fraction} factor conversion factor from the primary unit of this `UnitCategory` to the primary unit 
 * of the primary `UnitCategory` of this `UnitCategory`'s `UnitType`.
 * @returns `Promise` of constructed `UnitCategory` object.
 */
const parseUnitCategory = async(unitTypeName: string, unitCategoryName: string, factor: Fraction): Promise<UnitCategory> => {
    const jsonInput = await Load.Json(new URL(`/unit-converter/units/${unitTypeName}/${unitCategoryName}.json`, window.location.href))
    .catch(reason => { throw new Error(reason) })
    if (typeof(jsonInput.primaryUnit) === 'string' &&
        Array.isArray(jsonInput.units)) {

        let unitsArray: Unit[] = []
        for (const unitJson of jsonInput.units) {
            // Load each unit in the array from the JSON and push it into the array here
            unitsArray.push(parseUnit(unitJson))
        }

        const primaryUnit = unitsArray.find(unit => unit.fullName === jsonInput.primaryUnit)
        if (primaryUnit === undefined) {
            throw new Error(`Error: Unit category does not contain unit ${primaryUnit}`)
        }

        return {
            primaryUnit: Object.freeze(primaryUnit),
            name: Object.freeze(unitCategoryName),
            units: Object.freeze(unitsArray),
            factor: Object.freeze(factor)
        }
    } else {
        throw new Error(`Error: ${jsonInput.toString()} does not contain the correct fields to become a UnitCategory`)
    }
}

/**
 * Loads a {@linkcode UnitType} from JSON files.
 * @param unitTypeName Name of the unit type. The unit type's files must be located at 
 * `/units/${unitTypeName}.json`.
 * @returns the loaded unit type.
 */
const parseUnitType = async(unitTypeName: string): Promise<UnitType> => {
    // Load units.json file.
    const jsonInput = await Load.Json(new URL(`/unit-converter/units/${unitTypeName}/units.json`, window.location.href))
    .catch(reason => { throw new Error(reason) })

    if (typeof(jsonInput.primaryUnitCategory) === 'string' &&
        typeof(jsonInput.unit1) === 'string' &&
        typeof(jsonInput.unit2) === 'string' &&
        Array.isArray(jsonInput.categories)) {
        
        let unitCategoryPromisesArray: Promise<UnitCategory>[] = []

        for (const categoryPair of jsonInput.categories) {
            if (!(typeof(categoryPair) === 'object') || 
                !(typeof(categoryPair.name) === 'string' ||
                !(typeof(categoryPair.factor) === 'string'))) {
                throw new Error(`Error: Category pair ${categoryPair} does not contain the correct fields`)
            }

            // Load the .json file for each unit category.
            unitCategoryPromisesArray.push(parseUnitCategory(unitTypeName, categoryPair.name, Fraction.parseString(categoryPair.factor)))
        }

        const unitCategories: UnitCategory[] = await Promise.all(unitCategoryPromisesArray)

        const primaryUnitCategory = unitCategories.find(value => value.name === jsonInput.primaryUnitCategory)
        if (primaryUnitCategory === undefined) {
            throw new Error(`Error: Primary unit category named ${jsonInput.primaryUnitCategory} not found`)
        }

        const unit1 = primaryUnitCategory.units.find(unit => unit.fullName === jsonInput.unit1)
        if (unit1 === undefined) {
            throw new Error(`Error: Unit 1 named ${jsonInput.unit1} not found`)
        }

        const unit2 = primaryUnitCategory.units.find(unit => unit.fullName === jsonInput.unit2)
        if (unit2 === undefined) {
            throw new Error(`Error: Unit 2 named ${jsonInput.unit2} not found`)
        }

        return {
            primaryUnitCategory: Object.freeze(primaryUnitCategory),
            unit1: Object.freeze(unit1),
            unit2: Object.freeze(unit2),
            categories: Object.freeze(unitCategories)
        }
    } else {
        throw new Error(`Error: ${jsonInput.toString()} does not contain the correct fields to become a UnitType`)
    }
}

/**
 * Object which holds all currently available units for the Unit Converter application.
 */
const Units: {
    [key: string]: UnitType | undefined
} = await Load.Json(new URL('/unit-converter/units/types.json', window.location.href))
.catch(reason => { throw new Error(reason) })
.then(async value => {
        if (!Array.isArray(value)) {
            throw new Error(`Error: ${value} is not an array`)
        }

        let units: any = {}

        for (const unitTypeName of value) {
            if (!(typeof(unitTypeName) === 'string')) {
                throw new Error(`Error: ${unitTypeName} is not a valid type name`)
            }

            // Load each unit type into an array.
            units[unitTypeName] = await parseUnitType(unitTypeName)
        }

        return units
    }
)

export default Units