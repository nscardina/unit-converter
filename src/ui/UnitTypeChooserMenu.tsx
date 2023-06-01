import { Dropdown, DropdownButton } from "react-bootstrap";
import { capitalizeFirstLetter } from "../misc";
import Units from "../Unit";

export interface Props {
    unitTypeName: string,
    clickHandler: (str: string) => any
}

function UnitTypeChooserMenu({unitTypeName, clickHandler}: Props) {

    return (
		<>
			<DropdownButton title={`Unit Type: ${capitalizeFirstLetter(unitTypeName).replace(/_/g, ' ')}`}>
				<Dropdown.ItemText className="fw-bold text-decoration-underline">SI Base Units</Dropdown.ItemText>
				{Object.keys(Units).map(unitTypeName => (
					<Dropdown.Item onClick={() => clickHandler(unitTypeName)} key={unitTypeName}>
						{capitalizeFirstLetter(unitTypeName).replace(/_/g, ' ')}
					</Dropdown.Item>
				)).filter((_value, index) => index < 7)}
				<Dropdown.Divider />

				<Dropdown.ItemText className="fw-bold text-decoration-underline">SI Derived Units</Dropdown.ItemText>
				{Object.keys(Units).map(unitTypeName => (
					<Dropdown.Item onClick={() => clickHandler(unitTypeName)} key={unitTypeName}>
						{capitalizeFirstLetter(unitTypeName).replace(/_/g, ' ')}
					</Dropdown.Item>
				)).filter((_value, index) => index >= 7)}
			</DropdownButton>
		</>
	)
}

export default UnitTypeChooserMenu