import { parseExpression } from '.'
import Fraction from './fraction'
import './toequalfraction'

describe('Constructor Tests', () => {
    test('no-arguments constructor constructs {numerator: 0n, denominator: 1n}', () => {
        const frac = new Fraction()
        expect(frac).toHaveProperty('numerator', 0n)
        expect(frac).toHaveProperty('denominator', 1n)
    })

    test('constructor being passed 2 integer number arguments (3, 4) constructs ' + 
    '{numerator: 3n, denominator: 4n}', () => {
        const frac = new Fraction(3, 4)
        expect(frac).toHaveProperty('numerator', 3n)
        expect(frac).toHaveProperty('denominator', 4n)
    })

    test('constructor being passed 2 fractional number arguments (3.5, 7.5) should throw a TypeError', () => {
        expect(() => new Fraction(3.5, 7.5)).toThrow(TypeError)
    })

    test('constructor being passed 2 bigint arguments (5n, 6n) constructs ' + 
    '{numerator: 5n, denominator: 6n}', () => {
        const frac = new Fraction(5n, 6n)
        expect(frac).toHaveProperty('numerator', 5n)
        expect(frac).toHaveProperty('denominator', 6n)
    })

    test('constructor being passed 2 string arguments "3", "5" constructs {numerator: 3n, denominator: 5n}', () => {
        const frac = new Fraction('3', '5')
        expect(frac).toHaveProperty('numerator', 3n)
        expect(frac).toHaveProperty('denominator', 5n)
    })

    test('constructor being passed 2 invalid string arguments "3.5", "LMNOP" throws a TypeError', () => {
        expect(() => new Fraction('3.5', 'LMNOP')).toThrow(TypeError)
    })

    test('constructor being passed the Fraction {numerator: 3n, denominator: 4n} constructs ' + 
    'the same value', () => {
        const frac: Fraction = new Fraction(3n, 4n)
        const constructedFrac = new Fraction(frac)
        expect(constructedFrac).toHaveProperty('numerator', frac.numerator)
        expect(constructedFrac).toHaveProperty('denominator', frac.denominator)
    })
})

describe('plus() Method Tests', () => {

    const frac = new Fraction(1n, 1n)

    test('plus() being called with no arguments throws TypeError', () => {
        //@ts-ignore
        expect(() => frac.plus()).toThrow(TypeError)
    })

    test('plus() being called with two bigints 3n, 4n yields {numerator: 7n, denominator: 4n}', () => {
        const result = frac.plus(3n, 4n)
        expect(result).toHaveProperty('numerator', 7n)
        expect(result).toHaveProperty('denominator', 4n)
    })

    test('plus() being called with one bigint 3n yields {numerator: 4n, denominator: 1n}', () => {
        const result = frac.plus(3n)
        expect(result).toHaveProperty('numerator', 4n)
        expect(result).toHaveProperty('denominator', 1n)
    })

    test('plus() being called with two integer numbers 3, 4 yields {numerator: 7n, denominator: 4n}', () => {
        const result = frac.plus(3, 4)
        expect(result).toHaveProperty('numerator', 7n)
        expect(result).toHaveProperty('denominator', 4n)
    })

    test('plus() being called with one integer number 3 yields {numerator: 4n, denominator: 1n}', () => {
        const result = frac.plus(3)
        expect(result).toHaveProperty('numerator', 4n)
        expect(result).toHaveProperty('denominator', 1n)
    })

    test('plus() being called with two non-integer numbers 3.5, 7.5 throws TypeError', () => {
        expect(() => frac.plus(3.5, 7.5)).toThrow(TypeError)
    })

    test('plus() being called with integer strings "3", "4" yields {numerator: 7n, denominator: 4n}', () => {
        const result = frac.plus('3', '4')
        expect(result).toHaveProperty('numerator', 7n)
        expect(result).toHaveProperty('denominator', 4n)
    })

    test('plus() being called with integer string "3" yields {numerator: 4n, denominator: 1n}', () => {
        const result = frac.plus('3')
        expect(result).toHaveProperty('numerator', 4n)
        expect(result).toHaveProperty('denominator', 1n)
    })

    test('plus() being called with non-integer strings "3.5", "LMNOP" throws TypeError', () => {
        expect(() => frac.plus('3.5', 'LMNOP')).toThrow(TypeError)
    })

    test('plus() being called with non-integer string "3.5" throws TypeError', () => {
        expect(() => frac.plus('3.5')).toThrow(TypeError)
    })

    test('plus() being called with fraction {numerator: 3n, denominator: 4n} yields {numerator: 7n, denominator: 4n}', () => {
        const result = frac.plus(new Fraction(3n ,4n))
        expect(result).toHaveProperty('numerator', 7n)
        expect(result).toHaveProperty('denominator', 4n)
    })
    
})

describe('minus() Method Tests', () => {

    const frac = new Fraction(1n, 1n)

    test('minus() being called with no arguments throws TypeError', () => {
        //@ts-ignore
        expect(() => frac.minus()).toThrow(TypeError)
    })

    test('minus() being called with two bigints 3n, 4n yields {numerator: 1n, denominator: 4n}', () => {
        const result = frac.minus(3n, 4n)
        expect(result).toHaveProperty('numerator', 1n)
        expect(result).toHaveProperty('denominator', 4n)
    })

    test('minus() being called with one bigint 3n yields {numerator: -2n, denominator: 1n}', () => {
        const result = frac.minus(3n)
        expect(result).toHaveProperty('numerator', -2n)
        expect(result).toHaveProperty('denominator', 1n)
    })

    test('minus() being called with two integer numbers 3, 4 yields {numerator: 1n, denominator: 4n}', () => {
        const result = frac.minus(3, 4)
        expect(result).toHaveProperty('numerator', 1n)
        expect(result).toHaveProperty('denominator', 4n)
    })

    test('minus() being called with one integer number 3 yields {numerator: -2n, denominator: 1n}', () => {
        const result = frac.minus(3)
        expect(result).toHaveProperty('numerator', -2n)
        expect(result).toHaveProperty('denominator', 1n)
    })

    test('minus() being called with two non-integer numbers 3.5, 7.5 throws TypeError', () => {
        expect(() => frac.minus(3.5, 7.5)).toThrow(TypeError)
    })

    test('minus() being called with integer strings "3", "4" yields {numerator: 1n, denominator: 4n}', () => {
        const result = frac.minus('3', '4')
        expect(result).toHaveProperty('numerator', 1n)
        expect(result).toHaveProperty('denominator', 4n)
    })

    test('minus() being called with integer string "3" yields {numerator: -2n, denominator: 1n}', () => {
        const result = frac.minus('3')
        expect(result).toHaveProperty('numerator', -2n)
        expect(result).toHaveProperty('denominator', 1n)
    })

    test('minus() being called with non-integer strings "3.5", "LMNOP" throws TypeError', () => {
        expect(() => frac.minus('3.5', 'LMNOP')).toThrow(TypeError)
    })

    test('minus() being called with non-integer string "3.5" throws TypeError', () => {
        expect(() => frac.minus('3.5')).toThrow(TypeError)
    })

    test('minus() being called with fraction {numerator: 3n, denominator: 4n} yields {numerator: 1n, denominator: 4n}', () => {
        const result = frac.minus(new Fraction(3n ,4n))
        expect(result).toHaveProperty('numerator', 1n)
        expect(result).toHaveProperty('denominator', 4n)
    })
    
})

describe('times() Method Tests', () => {

    const frac = new Fraction(1n, 1n)

    test('times() being called with no arguments throws TypeError', () => {
        //@ts-ignore
        expect(() => frac.times()).toThrow(TypeError)
    })

    test('times() being called with two bigints 3n, 4n yields {numerator: 3n, denominator: 4n}', () => {
        const result = frac.times(3n, 4n)
        expect(result).toHaveProperty('numerator', 3n)
        expect(result).toHaveProperty('denominator', 4n)
    })

    test('times() being called with one bigint 3n yields {numerator: 3n, denominator: 1n}', () => {
        const result = frac.times(3n)
        expect(result).toHaveProperty('numerator', 3n)
        expect(result).toHaveProperty('denominator', 1n)
    })

    test('times() being called with two integer numbers 3, 4 yields {numerator: 3n, denominator: 4n}', () => {
        const result = frac.times(3, 4)
        expect(result).toHaveProperty('numerator', 3n)
        expect(result).toHaveProperty('denominator', 4n)
    })

    test('times() being called with one integer number 3 yields {numerator: 3n, denominator: 1n}', () => {
        const result = frac.times(3)
        expect(result).toHaveProperty('numerator', 3n)
        expect(result).toHaveProperty('denominator', 1n)
    })

    test('times() being called with two non-integer numbers 3.5, 7.5 throws TypeError', () => {
        expect(() => frac.times(3.5, 7.5)).toThrow(TypeError)
    })

    test('times() being called with integer strings "3", "4" yields {numerator: 3n, denominator: 4n}', () => {
        const result = frac.times('3', '4')
        expect(result).toHaveProperty('numerator', 3n)
        expect(result).toHaveProperty('denominator', 4n)
    })

    test('times() being called with integer string "3" yields {numerator: 3n, denominator: 1n}', () => {
        const result = frac.times('3')
        expect(result).toHaveProperty('numerator', 3n)
        expect(result).toHaveProperty('denominator', 1n)
    })

    test('times() being called with non-integer strings "3.5", "LMNOP" throws TypeError', () => {
        expect(() => frac.times('3.5', 'LMNOP')).toThrow(TypeError)
    })

    test('times() being called with non-integer string "3.5" throws TypeError', () => {
        expect(() => frac.times('3.5')).toThrow(TypeError)
    })

    test('times() being called with fraction {numerator: 3n, denominator: 4n} yields {numerator: 3n, denominator: 4n}', () => {
        const result = frac.times(new Fraction(3n ,4n))
        expect(result).toHaveProperty('numerator', 3n)
        expect(result).toHaveProperty('denominator', 4n)
    })
    
})

describe('div() Method Tests', () => {

    const frac = new Fraction(1n, 1n)

    test('div() being called with no arguments throws TypeError', () => {
        //@ts-ignore
        expect(() => frac.div()).toThrow(TypeError)
    })

    test('div() being called with two bigints 3n, 4n yields {numerator: 4n, denominator: 3n}', () => {
        const result = frac.div(3n, 4n)
        expect(result).toHaveProperty('numerator', 4n)
        expect(result).toHaveProperty('denominator', 3n)
    })

    test('div() being called with one bigint 3n yields {numerator: 1n, denominator: 3n}', () => {
        const result = frac.div(3n)
        expect(result).toHaveProperty('numerator', 1n)
        expect(result).toHaveProperty('denominator', 3n)
    })

    test('div() being called with two integer numbers 3, 4 yields {numerator: 4n, denominator: 3n}', () => {
        const result = frac.div(3, 4)
        expect(result).toHaveProperty('numerator', 4n)
        expect(result).toHaveProperty('denominator', 3n)
    })

    test('div() being called with one integer number 3 yields {numerator: 1n, denominator: 3n}', () => {
        const result = frac.div(3)
        expect(result).toHaveProperty('numerator', 1n)
        expect(result).toHaveProperty('denominator', 3n)
    })

    test('div() being called with two non-integer numbers 3.5, 7.5 throws TypeError', () => {
        expect(() => frac.div(3.5, 7.5)).toThrow(TypeError)
    })

    test('div() being called with integer strings "3", "4" yields {numerator: 4n, denominator: 3n}', () => {
        const result = frac.div('3', '4')
        expect(result).toHaveProperty('numerator', 4n)
        expect(result).toHaveProperty('denominator', 3n)
    })

    test('div() being called with integer string "3" yields {numerator: 1n, denominator: 3n}', () => {
        const result = frac.div('3')
        expect(result).toHaveProperty('numerator', 1n)
        expect(result).toHaveProperty('denominator', 3n)
    })

    test('div() being called with non-integer strings "3.5", "LMNOP" throws TypeError', () => {
        expect(() => frac.div('3.5', 'LMNOP')).toThrow(TypeError)
    })

    test('div() being called with non-integer string "3.5" throws TypeError', () => {
        expect(() => frac.div('3.5')).toThrow(TypeError)
    })

    test('div() being called with fraction {numerator: 3n, denominator: 4n} yields {numerator: 4n, denominator: 3n}', () => {
        const result = frac.div(new Fraction(3n ,4n))
        expect(result).toHaveProperty('numerator', 4n)
        expect(result).toHaveProperty('denominator', 3n)
    })
    
})

describe('equals() Method Tests', () => {

    const frac = new Fraction(1n, 1n)

    test('equals() being called with no arguments throws TypeError', () => {
        //@ts-ignore
        expect(() => frac.equals()).toThrow(TypeError)
    })

    test('equals() being called with two bigints 1n, 1n yields true', () => {
        expect(frac.equals(1n, 1n)).toBe(true)
    })

    test('equals() being called with two bigints 3n, 4n yields false', () => {
        expect(frac.equals(3n, 4n)).toBe(false)
    })

    test('equals() being called with one bigint 1n yields true', () => {
        expect(frac.equals(1n)).toBe(true)
    })

    test('equals() being called with one bigint 3n yields false', () => {
        expect(frac.equals(3n)).toBe(false)
    })

    test('equals() being called with two integer numbers 1, 1 yields true', () => {
        expect(frac.equals(1, 1)).toBe(true)
    })

    test('equals() being called with two integer numbers 3, 4 yields false', () => {
        expect(frac.equals(3, 4)).toBe(false)
    })

    test('equals() being called with one integer number 1 yields true', () => {
        expect(frac.equals(1)).toBe(true)
    })

    test('equals() being called with one integer number 3 yields false', () => {
        expect(frac.equals(3)).toBe(false)
    })

    test('equals() being called with two non-integer numbers 3.5, 7.5 throws TypeError', () => {
        expect(() => frac.equals(3.5, 7.5)).toThrow(TypeError)
    })

    test('equals() being called with non-integer number 3.5 throws TypeError', () => {
        expect(() => frac.equals(3.5)).toThrow(TypeError)
    })

    test('equals() being called with integer strings "1", "1" yields true', () => {
        expect(frac.equals('1', '1')).toBe(true)
    })

    test('equals() being called with integer strings "3", "4" yields false', () => {
        expect(frac.equals('3', '4')).toBe(false)
    })

    test('equals() being called with integer string "1" yields true', () => {
        expect(frac.equals('1')).toBe(true)
    })

    test('equals() being called with integer string "3" yields false', () => {
        expect(frac.equals('3')).toBe(false)
    })

    test('equals() being called with non-integer strings "3.5", "LMNOP" throws TypeError', () => {
        expect(() => frac.equals('3.5', 'LMNOP')).toThrow(TypeError)
    })

    test('equals() being called with non-integer string "3.5" throws TypeError', () => {
        expect(() => frac.equals('3.5')).toThrow(TypeError)
    })

    test('equals() being called with fraction {numerator: 1n, denominator: 1n} yields true', () => {
        const otherFrac = new Fraction(1n, 1n)
        expect(frac.equals(otherFrac)).toBe(true)
    })

    test('equals() being called with fraction {numerator: 3n, denominator: 4n} yields false', () => {
        const otherFrac = new Fraction(3n, 4n)
        expect(frac.equals(otherFrac)).toBe(false)
    })
    
})

describe('parseString() method tests', () => {
    test('parseString() being called with integer string "3" yields {numerator: 3n, denominator: 1n}', () => {
        const frac = Fraction.parseString('3')
        expect(frac).toHaveProperty('numerator', 3n)
        expect(frac).toHaveProperty('denominator', 1n)
    })

    test('parseString() being called with decimal string "3.5" yields {numerator: 7n, denominator: 2n}', () => {
        const frac = Fraction.parseString('3.5')
        expect(frac).toHaveProperty('numerator', 7n)
        expect(frac).toHaveProperty('denominator', 2n)
    })


})

describe('toDecimal() method tests', () => {
    test('toDecimal() being called with 0 decimal places on 15/2', () => {
        const frac = parseExpression('15/2')
        expect(frac.toDecimal(0n)).toBe('7')
    })

    test('toDecimal() being called with 1 decimal place on 15/2', () => {
        const frac = parseExpression('15/2')
        expect(frac.toDecimal(1n)).toBe('7.5')
    })

    test('toDecimal() being called with 3 decimal places on 2/3', () => {
        const frac = parseExpression('2/3')
        expect(frac.toDecimal(3n)).toBe('0.667')
    })

    test('toDecimal() being called with 3 decimal places on -2/3', () => {
        const frac = parseExpression('(0 - 2) / 3')
        expect(frac.toDecimal(3n)).toBe('-0.667')
    })

    test('toDecimal() being called with 3 decimal places on 1', () => {
        const frac = parseExpression('1')
        expect(frac.toDecimal(3n)).toBe('1')
    })
})