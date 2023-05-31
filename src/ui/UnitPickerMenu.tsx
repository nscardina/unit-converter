import { Dropdown, DropdownButton } from "react-bootstrap";
import Units, { Unit, UnitCategory } from "../Unit";

interface Props {
    unit: Unit,
    unitTypeName: string,
    onClickHandler: (unit: Unit, category: UnitCategory, newValue: string) => any,
    correspondingMenuRef: React.RefObject<any>
}

export default function UnitPickerMenu({unit, unitTypeName, onClickHandler, correspondingMenuRef}: Props) {
    return (
        
        <DropdownButton title={unit.abbreviation}>
            {Units[unitTypeName]!.categories.map(category => (
                <DropdownButton drop="end" title={category.primaryUnit.fullName}>
                    {category.units.map(unit => (
                        <Dropdown.Item onClick={() => onClickHandler(unit, category, 
                        (correspondingMenuRef.current?.value) as string)}>
                            {unit.fullName}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            ))}
		</DropdownButton>
    )
}