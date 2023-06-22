"use strict";

import { parseExpression } from "./expression/expression";
import gcd from "./gcd";
import { canBeConvertedToBigInt, canBeConvertedToFraction, isDecimalString } from "./utils";

/**
 * The `Fraction` class represents a mathematical fraction. Like a mathematical fraction, it contains `numerator` and 
 * `denominator` fields, and supports various mathematical operations. However, the `numerator` and `denominator` of 
 * a `Fraction` object can only contain `bigint` values; they cannot themselves be fractions, decimals, or anything but 
 * integers.
 * 
 * ## Creating `Fraction`s
 * `Fraction` objects can be created using the {@linkcode parseString()} static method, or using the constructor.
 * 
 * ## Supported Operations
 * `Fraction` objects support the following operations:
 * - **addition**, using the {@linkcode plus()} method,
 * - **subtraction**, using the {@linkcode minus()} method,
 * - **multiplication**, using the {@linkcode times()} method,
 * - **division**, using the {@linkcode div()} method.
 * 
 * `Fraction` objects also have the other following methods:
 * - {@linkcode equals()}, for testing for equality with other numbers and fractions
 */
class Fraction {

    /**
     * Parses a `string`, converting it into a `Fraction` object. If the string `str` passed to this method is 
     * valid (i.e. {@linkcode canBeConvertedToFraction()} returns `true` when `str` is passed to it), then the 
     * resulting fraction will satisfy the following characteristics:
     * - If `str` represents a decimal number (i.e. {@linkcode isDecimalString()} returns `true` when `str` is 
     * passed to it), then the `bigint` value of `str` when its decimal point is removed will become the 
     * {@linkcode numerator} of the resulting `Fraction`. If the number of digits to the right of the decimal 
     * point in `str` is *n*, then the {@linkcode denominator} of the resulting `Fraction` is the `bigint` 
     * value `10^n`.
     * @param str string to convert to a `Fraction`.
     * @returns newly created `Fraction` object.
     * @throws if the string cannot be converted successfully.
     */
    static parseString(str: string): Fraction {
        if (!canBeConvertedToFraction(str)) {
            throw new Error('Invalid string: Cannot be converted to Fraction')
        }

        const decimalPointIndex = str.indexOf('.')
        if (decimalPointIndex === -1) {
            return new Fraction(str, 1n)
        }

        const digitsRightOfPoint = str.substring(decimalPointIndex + 1)
        const numDigitsRightOfPoint = BigInt(digitsRightOfPoint.length)

        return new Fraction(BigInt(str.replace('.', '')), BigInt((10n ** (numDigitsRightOfPoint))))
    }


    /**
     * Numerator of this `Fraction`.
     */
    numerator: bigint

    /**
     * Denominator of this `Fraction`.
     */
    denominator: bigint

    /**
     * Constructs a new `Fraction` object.
     * This method can construct `Fraction` objects from either of the following sets of arguments: 
     * - `a`: `Fraction` (clones the {@linkcode numerator} and {@linkcode denominator} of `a`)
     * - `a`: `number | bigint | string`, `b`: `number | bigint | string` (sets the `numerator` to 
     * the `bigint` value of `a` and the `denominator` to the `bigint` value of `b`, both obtained 
     * through calling the 
     * {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/BigInt BigInt()}
     * function)
     * - No parameters, in which case `0n` is used as both the `numerator` and `denominator` of the 
     * newly constructed `Fraction` object.
     * @param {Fraction | number | bigint | string | undefined} a first parameter.
     * @param {number | bigint | string | undefined} b second parameter.
     * @throws TypeError if the parameters are not of the types specified above.
     */
    constructor(
        a?: Fraction | number | bigint | string, 
        b?: number | bigint | string
    ) {
        
        if (a instanceof Fraction) {
            this.numerator = a.numerator
            this.denominator = a.denominator
        } else if (
            ((typeof(a) === 'bigint') 
                || (typeof(a) === 'number' && Number.isInteger(a))
                || (typeof(a) === 'string' && canBeConvertedToBigInt(a))) &&
            ((typeof(b) === 'bigint')
                || (typeof(b) === 'number' && Number.isInteger(b))
                || (typeof(b) === 'string' && canBeConvertedToBigInt(b)))
        ) {
            this.numerator = BigInt(a)
            this.denominator = BigInt(b)
        } else if (a === undefined && b === undefined) {
            this.numerator = 0n
            this.denominator = 1n
        } else {
            const paramACorrect = ((typeof(a) === 'bigint') 
            || (typeof(a) === 'number' && Number.isInteger(a))
            || (typeof(a) === 'string' && canBeConvertedToBigInt(a)))
            const paramBCorrect = ((typeof(b) === 'bigint')
            || (typeof(b) === 'number' && Number.isInteger(b))
            || (typeof(b) === 'string' && canBeConvertedToBigInt(b)))
            throw new TypeError(`Invalid parameters "${
                !paramACorrect ? (a as any) : ''
            }"${!paramBCorrect ? `, "${(b as any)}"` : ''
            }: Must be of type "number (integral) | bigint | string, or one Fraction parameter"`)
        }

        this.simplify()
    }

    /**
     * Adds a number of some type to this `Fraction`. The number may be expressed either as a single 
     * `number`, `bigint`, or `string` passed as the first parameter, two arguments each of type 
     * `number`, `bigint`, or `string`, or as one single `Fraction` parameter.
     * @param {Fraction | number | bigint | string} a first parameter.
     * @param {number | bigint | string | undefined} b second parameter.
     * @throws TypeError if the parameters are not of the type specified above.
     */
    plus(
        a: Fraction | number | bigint | string,
        b?: number | bigint | string
    ): Fraction {
        if (a instanceof Fraction) {
            b = a.denominator
            a = a.numerator
        }

        if (
            ((typeof(a) === 'bigint') 
                || (typeof(a) === 'number' && Number.isInteger(a))
                || (typeof(a) === 'string' && canBeConvertedToBigInt(a))) &&
            ((typeof(b) === 'bigint')
                || (typeof(b) === 'number' && Number.isInteger(b))
                || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
                || b === undefined)
        ) {
            a = BigInt(a)
            if (b !== undefined) {
                b = BigInt(b)
            } else  {
                b = 1n
            } 
            
            let newNumerator = this.numerator * b + a * this.denominator
            let newDenominator = this.denominator * b
            let commonFactor = gcd(newNumerator, newDenominator)
            return new Fraction(newNumerator / commonFactor, newDenominator / commonFactor).simplify()
        } else {
            const paramACorrect = ((typeof(a) === 'bigint') 
            || (typeof(a) === 'number' && Number.isInteger(a))
            || (typeof(a) === 'string' && canBeConvertedToBigInt(a)))
            const paramBCorrect = ((typeof(b) === 'bigint')
            || (typeof(b) === 'number' && Number.isInteger(b))
            || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
            || b === undefined)
            throw new TypeError(`Invalid parameters "${
                !paramACorrect ? (a as any) : ''
            }"${!paramBCorrect ? `, "${(b as any)}"` : ''
            }: Must be of type "number | bigint | string, or one Fraction parameter"`)
        }
        
        
    }

    /**
     * Subtracts a number of some type from this `Fraction`. The number may be expressed either as a single 
     * `number`, `bigint`, or `string` passed as the first parameter, two arguments each of type 
     * `number`, `bigint`, or `string`, or as one single `Fraction` parameter.
     * @param {Fraction | number | bigint | string} a first parameter.
     * @param {number | bigint | string | undefined} b second parameter.
     * @throws TypeError if the parameters are not of the type specified above.
     */
    minus(
        a: Fraction | number | bigint | string,
        b?: number | bigint | string
    ): Fraction {
        if (a instanceof Fraction) {
            b = a.denominator
            a = a.numerator
        }

        if (
            ((typeof(a) === 'bigint') 
                || (typeof(a) === 'number' && Number.isInteger(a))
                || (typeof(a) === 'string' && canBeConvertedToBigInt(a))) &&
            ((typeof(b) === 'bigint')
                || (typeof(b) === 'number' && Number.isInteger(b))
                || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
                || b === undefined)
        ) {
            a = BigInt(a)
            if (b !== undefined) {
                b = BigInt(b)
            } else  {
                b = 1n
            } 
            
            let newNumerator = this.numerator * b - a * this.denominator
            let newDenominator = this.denominator * b
            let commonFactor = gcd(newNumerator, newDenominator)
            return new Fraction(newNumerator / commonFactor, newDenominator / commonFactor).simplify()
        } else {
            const paramACorrect = ((typeof(a) === 'bigint') 
            || (typeof(a) === 'number' && Number.isInteger(a))
            || (typeof(a) === 'string' && canBeConvertedToBigInt(a)))
            const paramBCorrect = ((typeof(b) === 'bigint')
            || (typeof(b) === 'number' && Number.isInteger(b))
            || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
            || b === undefined)
            throw new TypeError(`Invalid parameters "${
                !paramACorrect ? (a as any) : ''
            }"${!paramBCorrect ? `, "${(b as any)}"` : ''
            }: Must be of type "number | bigint | string, or one Fraction parameter"`)
        }
        
    }

    /**
     * Multiplies this `Fraction` by a number of some type. The number may be expressed either as a single 
     * `number`, `bigint`, or `string` passed as the first parameter, two arguments each of type 
     * `number`, `bigint`, or `string`, or as one single `Fraction` parameter.
     * @param {Fraction | number | bigint | string} a first parameter.
     * @param {number | bigint | string | undefined} b second parameter.
     * @throws TypeError if the parameters are not of the type specified above.
     */
    times(
        a: Fraction | number | bigint | string,
        b?: number | bigint | string
    ): Fraction {
        if (a instanceof Fraction) {
            b = a.denominator
            a = a.numerator
        }

        if (
            ((typeof(a) === 'bigint') 
                || (typeof(a) === 'number' && Number.isInteger(a))
                || (typeof(a) === 'string' && canBeConvertedToBigInt(a))) &&
            ((typeof(b) === 'bigint')
                || (typeof(b) === 'number' && Number.isInteger(b))
                || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
                || b === undefined)
        ) {
            a = BigInt(a)
            if (b !== undefined) {
                b = BigInt(b)
            } else  {
                b = 1n
            } 
            
            let newNumerator = this.numerator * a 
            let newDenominator = this.denominator * b
            let commonFactor = gcd(newNumerator, newDenominator)
            return new Fraction(newNumerator / commonFactor, newDenominator / commonFactor).simplify()
        } else {
            const paramACorrect = ((typeof(a) === 'bigint') 
            || (typeof(a) === 'number' && Number.isInteger(a))
            || (typeof(a) === 'string' && canBeConvertedToBigInt(a)))
            const paramBCorrect = ((typeof(b) === 'bigint')
            || (typeof(b) === 'number' && Number.isInteger(b))
            || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
            || b === undefined)
            throw new TypeError(`Invalid parameters "${
                !paramACorrect ? (a as any) : ''
            }"${!paramBCorrect ? `, "${(b as any)}"` : ''
            }: Must be of type "number | bigint | string, or one Fraction parameter"`)
        }
        
    }

    /**
     * Divides this `Fraction` by a number of some type. The number may be expressed either as a single 
     * `number`, `bigint`, or `string` passed as the first parameter, two arguments each of type 
     * `number`, `bigint`, or `string`, or as one single `Fraction` parameter.
     * @param {Fraction | number | bigint | string} a first parameter.
     * @param {number | bigint | string | undefined} b second parameter.
     * @throws TypeError if the parameters are not of the type specified above.
     */
    div(
        a: Fraction | number | bigint | string,
        b?: number | bigint | string
    ): Fraction {
        if (a instanceof Fraction) {
            b = a.denominator
            a = a.numerator
        }

        if (
            ((typeof(a) === 'bigint') 
                || (typeof(a) === 'number' && Number.isInteger(a))
                || (typeof(a) === 'string' && canBeConvertedToBigInt(a))) &&
            ((typeof(b) === 'bigint')
                || (typeof(b) === 'number' && Number.isInteger(b))
                || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
                || b === undefined)
        ) {
            a = BigInt(a)
            if (b !== undefined) {
                b = BigInt(b)
            } else  {
                b = 1n
            } 
            
            let newNumerator = this.numerator * b 
            let newDenominator = this.denominator * a
            let commonFactor = gcd(newNumerator, newDenominator)
            return new Fraction(newNumerator / commonFactor, newDenominator / commonFactor).simplify()
        } else {
            const paramACorrect = ((typeof(a) === 'bigint') 
            || (typeof(a) === 'number' && Number.isInteger(a))
            || (typeof(a) === 'string' && canBeConvertedToBigInt(a)))
            const paramBCorrect = ((typeof(b) === 'bigint')
            || (typeof(b) === 'number' && Number.isInteger(b))
            || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
            || b === undefined)
            throw new TypeError(`Invalid parameters "${
                !paramACorrect ? (a as any) : ''
            }"${!paramBCorrect ? `, "${(b as any)}"` : ''
            }: Must be of type "number | bigint | string, or one Fraction parameter"`)
        }
        
    }

    /**
     * Tests this `Fraction` for equality with a number of some type. The number may be expressed either as a single 
     * `number`, `bigint`, or `string` passed as the first parameter, two arguments each of type 
     * `number`, `bigint`, or `string`, or as one single `Fraction` parameter.
     * @param {Fraction | number | bigint | string} a first parameter.
     * @param {number | bigint | string | undefined} b second parameter.
     * @throws TypeError if the parameters are not of the type specified above.
     */
    equals(
        a: Fraction | number | bigint | string,
        b?: number | bigint | string
    ): boolean {
        if (a instanceof Fraction) {
            b = a.denominator
            a = a.numerator
        }

        if (
            ((typeof(a) === 'bigint') 
                || (typeof(a) === 'number' && Number.isInteger(a))
                || (typeof(a) === 'string' && canBeConvertedToBigInt(a))) &&
            ((typeof(b) === 'bigint')
                || (typeof(b) === 'number' && Number.isInteger(b))
                || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
                || b === undefined)
        ) {
            a = BigInt(a)
            if (b !== undefined) {
                b = BigInt(b)
            } else  {
                b = 1n
            } 

            return this.numerator === a && this.denominator === b
        } else {
            const paramACorrect = ((typeof(a) === 'bigint') 
            || (typeof(a) === 'number' && Number.isInteger(a))
            || (typeof(a) === 'string' && canBeConvertedToBigInt(a)))
            const paramBCorrect = ((typeof(b) === 'bigint')
            || (typeof(b) === 'number' && Number.isInteger(b))
            || (typeof(b) === 'string' && canBeConvertedToBigInt(b))
            || b === undefined)
            throw new TypeError(`Invalid parameters "${
                !paramACorrect ? (a as any) : ''
            }"${!paramBCorrect ? `, "${(b as any)}"` : ''
            }: Must be of type "number | bigint | string, or one Fraction parameter"`)
        }
        
    }

    /**
     * Simplifies this `Fraction` by dividing by the common factor of the `numerator` and `denominator`.
     */
    simplify(): Fraction {
        const commonFactor = gcd(this.numerator, this.denominator)
        this.numerator /= commonFactor
        this.denominator /= commonFactor
        return this
    }

    /**
     * Returns a decimal `string` representation of this `Fraction`, accurate to a certain number of 
     * decimal places.
     * @param numDecimalPlaces number of decimal places of accuracy to generate for the fraction's 
     * decimal representation.
     * @returns decimal representation of this `Fraction`.
     */
    toDecimal(numDecimalPlaces: bigint) {

        let strNumerator = this.numerator.toString()
        let strDenominator = this.denominator.toString()

        let absNum: bigint = 0n
        let absDen: bigint = 0n

        const negative = strNumerator.startsWith('-') !== strDenominator.startsWith('-')
        if (strNumerator.startsWith('-')) {
            strNumerator = strNumerator.substring(1)
            absNum = -this.numerator
        } else {
            absNum = this.numerator
        }
        if (strDenominator.startsWith('-')) {
            strDenominator = strDenominator.substring(1)
            absDen = -this.denominator
        } else {
            absDen = this.denominator
        }

        let decimal = ""
        let dividend: bigint
        let quotient: bigint = 0n
        let remainder: bigint = 0n

        // Write out the non-decimal part first
        for (let i = 0; i < strNumerator.length; i++) {
            dividend = remainder * 10n + BigInt(strNumerator.substring(i, i + 1))
            quotient = dividend / absDen
            remainder = dividend % absDen

            decimal += quotient
        }

        if (numDecimalPlaces > 0n) {
            decimal += '.'

            for (let i = 0; i < numDecimalPlaces + 1n; i++) {

                dividend = remainder * 10n
                quotient = dividend / absDen
                remainder = dividend % absDen
    
                decimal += quotient
            }

            if (BigInt(decimal.substring(decimal.length - 1, decimal.length)) >= 5n) {
                decimal = decimal.substring(0, decimal.length - 2) + (BigInt(decimal[decimal.length - 2]) + 1n).toString()
            } else {
                decimal = decimal.substring(0, decimal.length - 1)
            }
        }

        // return decimal after removing any zeroes in front of the decimal place.
        decimal = decimal.replace(/^0*(?!\.)/, '')
        if (/\.0+$/.test(decimal)) {
            decimal = decimal.replace(/\.0+$/, '')
        }
        if (negative) {
            decimal = `-${decimal}`
        }
        return decimal
    }

}

export default Fraction