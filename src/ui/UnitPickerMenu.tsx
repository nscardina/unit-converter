import { Dropdown, DropdownButton } from "react-bootstrap";
import Units, { Unit, UnitCategory } from "../Unit";
import React from "react";

interface Props {
    unit: Unit,
    unitTypeName: string,
    onClickHandler: (unit: Unit, category: UnitCategory, newValue: string) => any,
    correspondingMenuRef: React.RefObject<any>
}

export default function UnitPickerMenu({ unit, unitTypeName, onClickHandler, correspondingMenuRef }: Props) {

    console.log(Dropdown.Toggle)

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle>
                    {unit.abbreviation}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {Units[unitTypeName]!.categories.map(category => (
                        <Dropdown drop="end" className="dropright">
                            <Dropdown.Toggle variant="custom">
                                {category.primaryUnit.fullName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end" >
                                {category.units.map(unit => (
                                    <Dropdown.Item onClick={() => onClickHandler(unit, category, 
                                        (correspondingMenuRef.current?.value) as string)}>
                                        {unit.fullName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>

    )
}