import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Units, { Unit, UnitCategory } from './Unit'
import React, { useState } from 'react'
import UnitTypeChooserMenu from './ui/UnitTypeChooserMenu'
import UnitPickerMenu from './ui/UnitPickerMenu'
import Decimal from 'decimal.js'
import { Col, Container, Form, Row } from 'react-bootstrap'

function App() {

	Decimal.set({precision: 1e+9, toExpPos: 9e15})

	let [currentUnitTypeName, setCurrentUnitTypeName] = useState<string>('length')
	let [currentUnit1, setCurrentUnit1] = useState<Unit>(Units[currentUnitTypeName]!.primaryUnitCategory.units[0])
	let [currentUnit1Category, setCurrentUnit1Category] = useState<UnitCategory>(Units[currentUnitTypeName]!.primaryUnitCategory)
	let [currentUnit2, setCurrentUnit2] = useState<Unit>(Units[currentUnitTypeName]!.primaryUnitCategory.units[1])
	let [currentUnit2Category, setCurrentUnit2Category] = useState<UnitCategory>(Units[currentUnitTypeName]!.primaryUnitCategory)

	let [unit1Quantity, setUnit1Quantity] = useState<Decimal | string>(new Decimal(0))
	let [unit2Quantity, setUnit2Quantity] = useState<Decimal | string>(new Decimal(0))

	const unit1Picker = React.createRef()
	const unit2Picker = React.createRef()

	function handleUnitTypeNameChange(newName: string) {
		setCurrentUnitTypeName(newName)
		setCurrentUnit1(Units[newName]!.primaryUnitCategory.units[0])
		setCurrentUnit1Category(Units[newName]!.primaryUnitCategory)
		setCurrentUnit2(Units[newName]!.primaryUnitCategory.units[1])
		setCurrentUnit2Category(Units[newName]!.primaryUnitCategory)
		setUnit1Quantity(new Decimal(0))
		setUnit2Quantity(new Decimal(0))
	}

	function handleUnit1Change(unit: Unit, category: UnitCategory) {
		setCurrentUnit1(unit)
		setCurrentUnit1Category(category)
		handleUnit1QuantityChange(unit1Quantity.toString(), unit)
	}

	function handleUnit2Change(unit: Unit, category: UnitCategory) {
		setCurrentUnit2(unit)
		setCurrentUnit2Category(category)
		handleUnit2QuantityChange(unit2Quantity.toString(), unit)
	}

	function handleUnit1QuantityChange(newAmount: string, unit?: Unit) {
		try {
			let unit2 = new Decimal(newAmount)
			setUnit1Quantity(unit2)
			unit2 = unit2.times(unit ? unit.factor : currentUnit1.factor) // in terms of primary unit of unit1 category
			unit2 = unit2.times(currentUnit1Category.factor) // in terms of primary unit of primary category of unit1 type
			unit2 = unit2.div(currentUnit2Category.factor) // in terms of primary unit of unit2 category
			unit2 = unit2.div(currentUnit2.factor) // in terms of unit 2
			setUnit2Quantity(unit2)
		} catch {
			if (!newAmount) { 
				setUnit1Quantity('')
				setUnit2Quantity('')
			}
			else {
				setUnit1Quantity(newAmount)
				setUnit2Quantity('Error')
			}
		}
	}

	function handleUnit2QuantityChange(newAmount: string, unit?: Unit) {
		try {
			let unit1 = new Decimal(newAmount)
			setUnit2Quantity(unit1)
			unit1 = unit1.times(unit ? unit.factor : currentUnit2.factor) // in terms of primary unit of unit2 category
			unit1 = unit1.times(currentUnit2Category.factor) // in terms of primary unit of primary category of unit2 type
			unit1 = unit1.div(currentUnit1Category.factor) // in terms of primary unit of unit1 category
			unit1 = unit1.div(currentUnit1.factor) // in terms of unit 1
			setUnit1Quantity(unit1)
		} catch {
			if (!newAmount) {
				setUnit1Quantity('')
			} else {
				setUnit1Quantity('Error')
			}
		}
	}

	return (
		<>
			<Container>
				<Row className="mb-2">
					<UnitTypeChooserMenu unitTypeName={currentUnitTypeName} clickHandler={handleUnitTypeNameChange} />
				</Row>
				<Row>
					<Col className="d-flex">
						<Form.Control type="text" value={unit1Quantity.toString()} onChange={(e) => handleUnit1QuantityChange(e.target.value)} />
						<UnitPickerMenu correspondingMenuRef={unit1Picker} unit={currentUnit1} 
						unitTypeName={currentUnitTypeName} onClickHandler={handleUnit1Change} />
					</Col>
					<Col className="d-flex align-items-center" sm="auto">
						=
					</Col>
					<Col className="d-flex">
						<Form.Control type="text" value={unit2Quantity.toString()} onChange={(e) => handleUnit2QuantityChange(e.target.value)}></Form.Control>
						<UnitPickerMenu correspondingMenuRef={unit2Picker} unit={currentUnit2} 
						unitTypeName={currentUnitTypeName} onClickHandler={handleUnit2Change} />
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default App
