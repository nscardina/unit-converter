import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Units, { Unit, UnitCategory } from './Unit'
import React, { useState } from 'react'
import UnitTypeChooserMenu from './ui/UnitTypeChooserMenu'
import UnitPickerMenu from './ui/UnitPickerMenu'
import { Col, Container, Dropdown, Form, Row } from 'react-bootstrap'
import Fraction from 'ts-fraction'
import isConvertibleToBigInt from 'convertible-to-bigint'

function App() {

	let [currentUnitTypeName, setCurrentUnitTypeName] = useState<string>('length')
	let [currentUnit1, setCurrentUnit1] = useState<Unit>(Units[currentUnitTypeName]!.unit1)
	let [currentUnit1Category, setCurrentUnit1Category] = useState<UnitCategory>(Units[currentUnitTypeName]!.primaryUnitCategory)
	let [currentUnit2, setCurrentUnit2] = useState<Unit>(Units[currentUnitTypeName]!.unit2)
	let [currentUnit2Category, setCurrentUnit2Category] = useState<UnitCategory>(Units[currentUnitTypeName]!.primaryUnitCategory)

	let [unit1Quantity, setUnit1Quantity] = useState<Fraction | string>(Fraction.parseString('0'))
	let [unit2Quantity, setUnit2Quantity] = useState<Fraction | string>(Fraction.parseString('0'))

	let [decimalPlaces, setDecimalPlaces] = useState<bigint>(10n)

	const unit1Picker = React.createRef()
	const unit2Picker = React.createRef()

	function unit1QuantityToString() {
		return (unit1Quantity instanceof Fraction) ? unit1Quantity.toDecimal(decimalPlaces) : unit1Quantity
	}

	function unit2QuantityToString() {
		return (unit2Quantity instanceof Fraction) ? unit2Quantity.toDecimal(decimalPlaces) : unit2Quantity
	}

	function handleUnitTypeNameChange(newName: string) {
		setCurrentUnitTypeName(newName)
		setCurrentUnit1(Units[newName]!.unit1)
		setCurrentUnit1Category(Units[newName]!.primaryUnitCategory)
		setCurrentUnit2(Units[newName]!.unit2)
		setCurrentUnit2Category(Units[newName]!.primaryUnitCategory)
		setUnit1Quantity(Fraction.parseString('0'))
		setUnit2Quantity(Fraction.parseString('0'))
	}

	function handleUnit1Change(unit: Unit, category: UnitCategory) {
		setCurrentUnit1(unit)
		setCurrentUnit1Category(category)
		handleUnit1QuantityChange(unit1QuantityToString(), unit)
	}

	function handleUnit2Change(unit: Unit, category: UnitCategory) {
		setCurrentUnit2(unit)
		setCurrentUnit2Category(category)
		handleUnit2QuantityChange(unit2QuantityToString(), unit)
	}

	function handleUnit1QuantityChange(newAmount: string, unit?: Unit) {
		try {
			let unit2 = Fraction.parseString(newAmount)
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
			let unit1 = Fraction.parseString(newAmount)
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
					<Col></Col>
					<Col>
						<UnitTypeChooserMenu unitTypeName={currentUnitTypeName} clickHandler={handleUnitTypeNameChange} />
					</Col>
					<Col className="d-flex flex-row-reverse ">
						<Dropdown align="end" autoClose="outside">
							<Dropdown.Toggle>
								<i className="bi bi-gear-fill"></i>&nbsp;
							</Dropdown.Toggle>
							<Dropdown.Menu className="p-4">
									Max&nbsp;number of&nbsp;decimal&nbsp;places:
									<Form.Control type="text" value={String(decimalPlaces)} 
										onChange={(e) => {
											if (isConvertibleToBigInt(e.target.value) && 
											BigInt(e.target.value) >= 0 &&
											BigInt(e.target.value) <= 1000) {
												setDecimalPlaces(BigInt(e.target.value))
											} else {
												setDecimalPlaces(decimalPlaces)
											}
										}
									}></Form.Control>
									
							</Dropdown.Menu>
						</Dropdown>
					</Col>
					
				</Row>
				<Row>
					<Col className="d-flex">
						<Form.Control type="text" value={unit1QuantityToString()} 
							onChange={(e) => handleUnit1QuantityChange(e.target.value)} />
						<UnitPickerMenu correspondingMenuRef={unit1Picker} unit={currentUnit1} 
						unitTypeName={currentUnitTypeName} onClickHandler={handleUnit1Change} />
					</Col>
					<Col className="d-flex align-items-center justify-content-center" sm="auto">
						=
					</Col>
					<Col className="d-flex">
						<Form.Control type="text" value={unit2QuantityToString()} 
						onChange={(e) => handleUnit2QuantityChange(e.target.value)}></Form.Control>
						<UnitPickerMenu correspondingMenuRef={unit2Picker} unit={currentUnit2} 
						unitTypeName={currentUnitTypeName} onClickHandler={handleUnit2Change} />
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default App
