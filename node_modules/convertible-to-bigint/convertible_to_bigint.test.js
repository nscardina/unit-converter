import isConvertibleToBigInt from "./convertible_to_bigint"
import {describe, test, expect} from '@jest/globals'

describe('Tests for isConvertibleToBigInt() passing bigint', () => {
    test('Passing 0n returns true', () => {
        expect(isConvertibleToBigInt(0n)).toBe(true)
    })

    test('Passing 134192841329048234n returns true', () => {
        expect(isConvertibleToBigInt(134192841329048234n)).toBe(true)
    })
})

describe('Tests for isConvertibleToBigInt() passing boolean', () => {
    test('Passing true returns true', () => {
        expect(isConvertibleToBigInt(true)).toBe(true)
    })

    test('Passing false returns true', () => {
        expect(isConvertibleToBigInt(false)).toBe(true)
    })
}) 

describe('Tests for isConvertibleToBigInt() passing integer', () => {
    test('Passing safe integer 10000 returns true', () => {
        expect(isConvertibleToBigInt(10000)).toBe(true)
    })

    test('Passing unsafe integer Number.MAX_SAFE_INTEGER + 1 returns false', () => {
        expect(isConvertibleToBigInt(Number.MAX_SAFE_INTEGER + 1)).toBe(false)
    })

    test('Passing unsafe integer Number.MIN_SAFE_INTEGER - 1 returns false', () => {
        expect(isConvertibleToBigInt(Number.MIN_SAFE_INTEGER - 1)).toBe(false)
    })

    test('Passing decimal number 3.14 returns false', () => {
        expect(isConvertibleToBigInt(3.14)).toBe(false)
    })

    test('Passing NaN returns false', () => {
        expect(isConvertibleToBigInt(NaN)).toBe(false)
    })

    test('Passing Number.POSITIVE_INFINITY returns false', () => {
        expect(isConvertibleToBigInt(Number.POSITIVE_INFINITY)).toBe(false)
    })

    test('Passing Number.NEGATIVE_INFINITY returns false', () => {
        expect(isConvertibleToBigInt(Number.NEGATIVE_INFINITY)).toBe(false)
    })
})

describe('Tests for isConvertibleToBigInt() passing string', () => {
    test('Passing the empty string returns true', () => {
        expect(isConvertibleToBigInt('')).toBe(true)
    })

    test('Passing the base 10 integer string 329417829057329057132985723902394487295139025718572397510321 returns true', () => {
        expect(isConvertibleToBigInt('329417829057329057132985723902394487295139025718572397510321')).toBe(true)
    })

    test('Passing the base 10 integer string +329417829057329057132985723902394487295139025718572397510321 with ' + 
    'a plus sign in front returns true', () => {
        expect(isConvertibleToBigInt('+329417829057329057132985723902394487295139025718572397510321')).toBe(true)
    })

    test('Passing the base 10 integer string ++329417829057329057132985723902394487295139025718572397510321 with ' + 
    'two plus signs in front returns false', () => {
        expect(isConvertibleToBigInt('++329417829057329057132985723902394487295139025718572397510321')).toBe(false)
    })

    test('Passing the base 10 integer string 329417829057329057132985723902+394487295139025718572397510321 with ' +
    'a plus sign in the middle returns false', () => {
        expect(isConvertibleToBigInt('329417829057329057132985723902+394487295139025718572397510321')).toBe(false)
    })

    test('Passing the base 10 integer string 329417829057329057132985723902394487295139025718572397510321+ with ' +
    'a plus sign at the end returns false', () => {
        expect(isConvertibleToBigInt('329417829057329057132985723902394487295139025718572397510321+')).toBe(false)
    })

    test('Passing the base 10 integer string -329417829057329057132985723902394487295139025718572397510321 with ' + 
    'a minus sign in front returns true', () => {
        expect(isConvertibleToBigInt('-329417829057329057132985723902394487295139025718572397510321')).toBe(true)
    })

    test('Passing the base 10 integer string --329417829057329057132985723902394487295139025718572397510321 with ' + 
    'two minus signs in front returns false', () => {
        expect(isConvertibleToBigInt('--329417829057329057132985723902394487295139025718572397510321')).toBe(false)
    })

    test('Passing the base 10 integer string 329417829057329057132985723902-394487295139025718572397510321 with ' +
    'a minus sign in the middle returns false', () => {
        expect(isConvertibleToBigInt('329417829057329057132985723902-394487295139025718572397510321')).toBe(false)
    })

    test('Passing the base 10 integer string 329417829057329057132985723902394487295139025718572397510321- with ' +
    'a minus sign at the end returns false', () => {
        expect(isConvertibleToBigInt('329417829057329057132985723902394487295139025718572397510321-')).toBe(false)
    })

    test('Passing letters in the base 10 integer string 3421ABCDEF returns false', () => {
        expect(isConvertibleToBigInt('3421ABCDEF')).toBe(false)
    })

    test('Passing the binary integer string 0b0101000101 returns true', () => {
        expect(isConvertibleToBigInt('0b0101000101')).toBe(true)
    })

    test('Passing the binary integer string +0b0101000101 with a plus sign at the start returns false', () => {
        expect(isConvertibleToBigInt('+0b0101000101')).toBe(false)
    })

    test('Passing the binary integer string +0b0101000101 with a plus sign at the start returns false', () => {
        expect(isConvertibleToBigInt('+0b0101000101')).toBe(false)
    })

    test('Passing the binary integer string ++0b0101000101 with two plus signs at the start returns false', () => {
        expect(isConvertibleToBigInt('++0b0101000101')).toBe(false)
    })

    test('Passing the binary integer string 0b01010+00101 with a plus sign in the middle returns false', () => {
        expect(isConvertibleToBigInt('0b01010+00101')).toBe(false)
    })

    test('Passing the binary integer string 0b0101000101+ with a plus sign at the start returns false', () => {
        expect(isConvertibleToBigInt('0b0101000101+')).toBe(false)
    })

    test('Passing the binary integer string -0b0101000101 with a minus sign at the start returns false', () => {
        expect(isConvertibleToBigInt('-0b0101000101')).toBe(false)
    })

    test('Passing the binary integer string --0b0101000101 with two minus signs at the start returns false', () => {
        expect(isConvertibleToBigInt('--0b0101000101')).toBe(false)
    })

    test('Passing the binary integer string 0b01010-00101 with a minus sign in the middle returns false', () => {
        expect(isConvertibleToBigInt('0b01010-00101')).toBe(false)
    })

    test('Passing the binary integer string 0b0101000101- with a minus sign at the start returns false', () => {
        expect(isConvertibleToBigInt('0b0101000101-')).toBe(false)
    })

    test('Passing other numbers in a binary string than 0 or 1 returns false', () => {
        expect(isConvertibleToBigInt('0b0319025830209')).toBe(false)
    })

    test('Passing other characters than 0 or 1 in a binary string returns false', () => {
        expect(isConvertibleToBigInt('0b010a100n01d010w')).toBe(false)
    })

    test('Passing the octal integer string 0o03175357123475 returns true', () => {
        expect(isConvertibleToBigInt('0o03175357123475')).toBe(true)
    })

    test('Passing the octal integer string +0o03175357123475 with a plus sign in front returns false', () => {
        expect(isConvertibleToBigInt('+0o03175357123475')).toBe(false)
    })

    test('Passing the octal integer string ++0o03175357123475 with two plus signs in front returns false', () => {
        expect(isConvertibleToBigInt('++0o03175357123475')).toBe(false)
    })

    test('Passing the octal integer string 0o0317535+7123475 with a plus sign in the center returns false', () => {
        expect(isConvertibleToBigInt('0o0317535+7123475')).toBe(false)
    })

    test('Passing the octal integer string 0o03175357123475+ with a plus sign at the end returns false', () => {
        expect(isConvertibleToBigInt('0o03175357123475+')).toBe(false)
    })

    test('Passing the octal integer string -0o03175357123475 with a minus sign in front returns false', () => {
        expect(isConvertibleToBigInt('-0o03175357123475')).toBe(false)
    })

    test('Passing the octal integer string --0o03175357123475 with two minus signs in front returns false', () => {
        expect(isConvertibleToBigInt('--0o03175357123475')).toBe(false)
    })

    test('Passing the octal integer string 0o0317535-7123475 with a minus sign in the center returns false', () => {
        expect(isConvertibleToBigInt('0o0317535-7123475')).toBe(false)
    })

    test('Passing the octal integer string 0o03175357123475- with a minus sign at the end returns false', () => {
        expect(isConvertibleToBigInt('0o03175357123475-')).toBe(false)
    })

    test('Passing other numbers in an octal string than 0-7 returns false', () => {
        expect(isConvertibleToBigInt('0b0319025830209')).toBe(false)
    })

    test('Passing other characters than 0-7 in a octal string returns false', () => {
        expect(isConvertibleToBigInt('0o0317a53571234v75')).toBe(false)
    })

    test('Passing the hexadecimal integer string 0x34a7b3fed048 returns true', () => {
        expect(isConvertibleToBigInt('0x34a7b3fed048')).toBe(true)
    })

    test('Passing the hexadecimal integer string +0x34a7b3fed048 with a plus sign in front returns false', () => {
        expect(isConvertibleToBigInt('+0x34a7b3fed048')).toBe(false)
    })

    test('Passing the hexadecimal integer string ++0x34a7b3fed048 with two plus signs in front returns false', () => {
        expect(isConvertibleToBigInt('++0x34a7b3fed048')).toBe(false)
    })

    test('Passing the hexadecimal integer string 0x34a7b3+fed048 with a plus sign in the middle returns false', () => {
        expect(isConvertibleToBigInt('0x34a7b3+fed048')).toBe(false)
    })

    test('Passing the hexadecimal integer string 0x34a7b3fed048+ with a plus sign at the end returns false', () => {
        expect(isConvertibleToBigInt('+0x34a7b3fed048+')).toBe(false)
    })

    test('Passing the hexadecimal integer string -0x34a7b3fed048 with a minus sign in front returns false', () => {
        expect(isConvertibleToBigInt('-0x34a7b3fed048')).toBe(false)
    })

    test('Passing the hexadecimal integer string --0x34a7b3fed048 with two minus signs in front returns false', () => {
        expect(isConvertibleToBigInt('--0x34a7b3fed048')).toBe(false)
    })

    test('Passing the hexadecimal integer string 0x34a7b3-fed048 with a minus sign in the middle returns false', () => {
        expect(isConvertibleToBigInt('0x34a7b3-fed048')).toBe(false)
    })

    test('Passing the hexadecimal integer string 0x34a7b3fed048- with a minus sign at the end returns false', () => {
        expect(isConvertibleToBigInt('+0x34a7b3fed048-')).toBe(false)
    })

    test('Passing other characters than 0-9, A-F, a-f in a hexadecimal string returns false', () => {
        expect(isConvertibleToBigInt('0o0317a53571234v75')).toBe(false)
    })
})