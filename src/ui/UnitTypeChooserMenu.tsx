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
			<DropdownButton title={`Unit Type: ${capitalizeFirstLetter(unitTypeName)}`}>
				{Object.keys(Units).map(unitTypeName => (
					<Dropdown.Item onClick={() => clickHandler(unitTypeName)}>
						{capitalizeFirstLetter(unitTypeName)}
					</Dropdown.Item>
				))}
			</DropdownButton>
		</>
	)
}

export default UnitTypeChooserMenu