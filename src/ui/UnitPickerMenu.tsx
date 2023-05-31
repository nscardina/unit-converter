import { Dropdown, DropdownButton } from "react-bootstrap";
import Units, { Unit } from "../Unit";

interface Props {
    unit: Unit
    unitTypeName: string
    onClickHandler: (unit: Unit) => any
}

export default function UnitPickerMenu({unit, unitTypeName, onClickHandler}: Props) {
    return (
        <DropdownButton title={unit.abbreviation}>
            {Units[unitTypeName]!.categories.map(category => (
                <DropdownButton drop="end" title={category.primaryUnit.fullName}>
                    {category.units.map(unit => (
                        <Dropdown.Item onClick={() => onClickHandler(unit)}>
                            {unit.fullName}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            ))}
		</DropdownButton>
    )
}