import { DECIMAL_STRING_REGEX, canBeConvertedToBigInt, canBeConvertedToFraction } from "./utils";

describe('DECIMAL_STRING_REGEX tests', () => {
    test('Regex matches integer 3', () => {
        expect(DECIMAL_STRING_REGEX.test('3')).toBe(true)
    })

    test('Regex matches integer +3', () => {
        expect(DECIMAL_STRING_REGEX.test('+3')).toBe(true)
    })

    test('Regex matches integer -3', () => {
        expect(DECIMAL_STRING_REGEX.test('-3')).toBe(true)
    })

    test('Regex does not match minus sign', () => {
        expect(DECIMAL_STRING_REGEX.test('-')).toBe(false)
    })

    test('Regex does not match plus sign', () => {
        expect(DECIMAL_STRING_REGEX.test('+')).toBe(false)
    })

    test('Regex matches decimal 3.5', () => {
        expect(DECIMAL_STRING_REGEX.test('3.5')).toBe(true)
    })

    test('Regex matches decimal +3.5', () => {
        expect(DECIMAL_STRING_REGEX.test('3.5')).toBe(true)
    })

    test('Regex matches decimal -3.5', () => {
        expect(DECIMAL_STRING_REGEX.test('3.5')).toBe(true)
    })

    test('Regex matches decimal .5', () => {
        expect(DECIMAL_STRING_REGEX.test('.5')).toBe(true)
    })

    test('Regex does not match decimal 3.', () => {
        expect(DECIMAL_STRING_REGEX.test('3.')).toBe(false)
    })
})

describe('canBeConvertedToBigInt() tests', () => {
    test('Convert positive integer string to BigInt', () => {
        expect(canBeConvertedToBigInt('15')).toBe(true)
    })
    
    test('Convert positive integer with + sign to BigInt', () => {
        expect(canBeConvertedToBigInt('+15')).toBe(true)
    })
    
    test('Convert negative integer to BigInt', () => {
        expect(canBeConvertedToBigInt('-15')).toBe(true)
    })
    
    test('Convert non-integer string to BigInt', () => {
        expect(canBeConvertedToBigInt('3.5')).toBe(false)
    })
    
    test('Convert non-numeric string to BigInt', () => {
        expect(canBeConvertedToBigInt('ABC')).toBe(false)
    })
})

describe('canBeConvertedToFraction() tests', () => {
    test('Convert positive integer 3 to Fraction', () => {
        expect(canBeConvertedToFraction('3')).toBe(true)
    })

    test('Convert positive integer to Fraction', () => {
        expect(canBeConvertedToFraction('15')).toBe(true)
    })

    test('Convert positive integer with + sign to Fraction', () => {
        expect(canBeConvertedToFraction('+15')).toBe(true)
    })

    test('Convert negative integer to Fraction', () => {
        expect(canBeConvertedToFraction('-15')).toBe(true)
    })

    test('Convert non-integer positive numeric string to Fraction', () => {
        expect(canBeConvertedToFraction('3.5')).toBe(true)
    })

    test('Convert non-integer positive numeric string with + sign to Fraction', () => {
        expect(canBeConvertedToFraction('+3.5')).toBe(true)
    })

    test('Convert non-integer negative numeric string to Fraction', () => {
        expect(canBeConvertedToFraction('-3.5')).toBe(true)
    })

    test('Convert invalid numeric string to Fraction', () => {
        expect(canBeConvertedToFraction('3.5.5')).toBe(false)
    })

    test('Convert invalid numeric string to Fraction', () => {
        expect(canBeConvertedToFraction('3.5.5')).toBe(false)
    })

    test('Convert numeric string with no digits to the left of the decimal point to Fraction', () => {
        expect(canBeConvertedToFraction('.025')).toBe(true)
    })

    test('Convert numeric string with no digits to the right of the decimal point to Fraction', () => {
        expect(canBeConvertedToFraction('10.')).toBe(false)
    })
})