import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import Units, { Unit, UnitsType } from './Unit'
import { useState } from 'react'
import { capitalizeFirstLetter } from './misc'
import UnitTypeChooserMenu from './ui/UnitTypeChooserMenu'
import UnitPickerMenu from './ui/UnitPickerMenu'

function App() {

	const [currentUnitTypeName, setCurrentUnitTypeName] = useState<string>('length')
	const [currentUnit1, setCurrentUnit1] = useState<Unit>(Units[currentUnitTypeName]!.primaryUnitCategory.units[0])
	const [currentUnit2, setCurrentUnit2] = useState<Unit>(Units[currentUnitTypeName]!.primaryUnitCategory.units[1])

	function handleUnitTypeNameChange(newName: string) {
		setCurrentUnitTypeName(newName)
		setCurrentUnit1(Units[newName]!.primaryUnitCategory.units[0])
		setCurrentUnit2(Units[newName]!.primaryUnitCategory.units[1])
	}

	return (
		<>
			<UnitTypeChooserMenu unitTypeName={currentUnitTypeName} clickHandler={handleUnitTypeNameChange} />

			<UnitPickerMenu unit={currentUnit1} unitTypeName={currentUnitTypeName} onClickHandler={setCurrentUnit1} />
			<UnitPickerMenu unit={currentUnit2} unitTypeName={currentUnitTypeName} onClickHandler={setCurrentUnit2} />
		</>
	)
}

export default App
