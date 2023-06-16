import { findFirstMatchingParentheses, matchTokenAtBeginningOfString, parseExprNoParens, parseExpression, parseToTokens, removeAllWhitespace } from "./expression"
import Fraction from "../fraction"

import '../toequalfraction'
import TokenType from "./tokentype"

describe('removeAllWhitespace() method tests', () => {
    test('Passing string with no whitespace returns the same string', () => {
        expect(removeAllWhitespace('StringWithNoWhitespace')).toEqual('StringWithNoWhitespace')
    })

    test('Passing string with whitespace returns the same string, without any whitespace', () => {
        expect(removeAllWhitespace('String With Whitespace')).toEqual('StringWithWhitespace')
    })

    test('Passing string with multiple consecutive spaces returns the same string, without any whitespace', () => {
        expect(removeAllWhitespace('String     With   Whitespace')).toEqual('StringWithWhitespace')
    })

    test('Passing string with all whitespace returns the empty string', () => {
        expect(removeAllWhitespace('                               \n')).toEqual('')
    })
})

describe('matchTokenAtBeginningOfString() static method tests', () => {
    test('Passing string which matches no tokens returns null', () => {
        expect(matchTokenAtBeginningOfString('ABCDEFGH')).toBe(null)
    })

    test('Passing string which matches TokenType.AdditionOperator returns TokenType.AdditionOperator', () => {
        //@ts-ignore
        expect(matchTokenAtBeginningOfString('+ABC')[0]).toBe(TokenType.AdditionOperator)
    })

    test('Passing string which matches TokenType.SubtractionOperator returns TokenType.SubtractionOperator', () => {
        //@ts-ignore
        expect(matchTokenAtBeginningOfString('-ABC')[0]).toBe(TokenType.SubtractionOperator)
    })

    test('Passing string which matches TokenType.MultiplicationOperator returns TokenType.MultiplicationOperator', () => {
        //@ts-ignore
        expect(matchTokenAtBeginningOfString('*ABC')[0]).toBe(TokenType.MultiplicationOperator)
    })

    test('Passing string which matches TokenType.DivisionOperator returns TokenType.DivisionOperator', () => {
        //@ts-ignore
        expect(matchTokenAtBeginningOfString('/ABC')[0]).toBe(TokenType.DivisionOperator)
    })

    test('Passing string which matches TokenType.LeftParenthesisOperator returns TokenType.LeftParenthesisOperator', () => {
        //@ts-ignore
        expect(matchTokenAtBeginningOfString('(ABC')[0]).toBe(TokenType.LeftParenthesisOperator)
    })

    test('Passing string which matches TokenType.RightParenthesisOperator returns TokenType.RightParenthesisOperator', () => {
        //@ts-ignore
        expect(matchTokenAtBeginningOfString(')ABC')[0]).toBe(TokenType.RightParenthesisOperator)
    })

    // test('Passing string which matches TokenType.Number returns TokenType.Number', () => {
    //     const expectedFraction = Fraction.parseString('5832.403')
    //     expect(matchTokenAtBeginningOfString('5832.403')[0]).toBe(expectedFraction)
    // })
})

describe('parseToTokens() static method tests', () => {
    test('Passing empty string returns empty array', () => {
        expect(parseToTokens('')).toEqual([])
    })

    test('Passing string with a number returns [TokenType.Number]', () => {
        const expectedFraction = Fraction.parseString('3.5')
        expect(parseToTokens('3.5')[0]).toEqualFraction(expectedFraction)
    })

    test('Passing a string with a plus sign returns [TokenType.AdditionOperator]', () => {
        expect(parseToTokens('+')).toEqual([TokenType.AdditionOperator])
    })

    test('Passing a string with a minus sign returns [TokenType.SubtractionOperator]', () => {
        expect(parseToTokens('-')).toEqual([TokenType.SubtractionOperator])
    })

    test('Passing a string with a star returns [TokenType.MultiplicationOperator]', () => {
        expect(parseToTokens('*')).toEqual([TokenType.MultiplicationOperator])
    })

    test('Passing a string with a forward slash returns [TokenType.DivisionOperator]', () => {
        expect(parseToTokens('/')).toEqual([TokenType.DivisionOperator])
    })

    test('Passing a string with a left parenthesis returns [TokenType.LeftParenthesisOperator]', () => {
        expect(parseToTokens('(')).toEqual([TokenType.LeftParenthesisOperator])
    })

    test('Passing a string with a right parenthesis returns [TokenType.RightParenthesisOperator]', () => {
        expect(parseToTokens(')')).toEqual([TokenType.RightParenthesisOperator])
    })

    test('Passing a string with an addition expression 3 + 5 returns [3/1, TokenType.AdditionOperator, 5/1]', () => {
        const expectedResult = [
            Fraction.parseString('3'), 
            TokenType.AdditionOperator, 
            Fraction.parseString('5')
        ]
        expect(parseToTokens('3 + 5')).toEqual(expectedResult)
    })

    test('Passing a string with an expression 3 + (5 - 54 * 203) / (1) returns [3/1, TokenType.AdditionOperator, ' +
    'TokenType.LeftParenthesisOperator, 5/1, TokenType.SubtractionOperator, 54/1, TokenType.MultiplicationOperator, ' +
    '203/1, TokenType.RightParenthesisOperator, TokenType.DivisionOperator, TokenType.LeftParenthesisOperator, ' + 
    '1/1, TokenType.RightParenthesisOperator]', () => {
        expect(parseToTokens('3 + (5 - 54 * 203) / (1)')).toEqual(
            [Fraction.parseString('3'),
                TokenType.AdditionOperator,
                TokenType.LeftParenthesisOperator,
                Fraction.parseString('5'),
                TokenType.SubtractionOperator, 
                Fraction.parseString('54'),
                TokenType.MultiplicationOperator,
                Fraction.parseString('203'),
                TokenType.RightParenthesisOperator,
                TokenType.DivisionOperator,
                TokenType.LeftParenthesisOperator,
                Fraction.parseString('1'),
                TokenType.RightParenthesisOperator
            ]
        )
    })
})

describe('findFirstMatchingParentheses() function tests', () => {
    test('passing expression "3 + 5" returns null', () => {
        expect(findFirstMatchingParentheses(parseToTokens('3 + 5'))).toBe(null)
    })

    test('passing expression "(3 + 5)" returns [0, 4]', () => {
        expect(findFirstMatchingParentheses(parseToTokens('(3 + 5)'))).toEqual([0, 4])
    })
    
    test('passing expression "(3 + (5))" returns [3, 5]', () => {
        expect(findFirstMatchingParentheses(parseToTokens('(3 + (5))'))).toEqual([3, 5])
    })

    test('passing expression "3 + 5)))" throws error', () => {
        expect(() => findFirstMatchingParentheses(parseToTokens('3 + 5)))'))).toThrow(Error)
    })
})

describe('parseExprNoParens() function tests', () => {
    test('parsing expression "3" returns [3/1]', () => {
        expect(parseExprNoParens(parseToTokens('3'))[0]).toEqualFraction(Fraction.parseString('3'))
    })

    test('parsing expression "3 + 5" returns [8/1]', () => {
        expect(parseExprNoParens(parseToTokens('3 + 5'))[0]).toEqualFraction(Fraction.parseString('8'))
    })

    test('parsing expression "3 - 5" returns [-2/1]', () => {
        expect(parseExprNoParens(parseToTokens('3 - 5'))[0]).toEqualFraction(Fraction.parseString('-2'))
    })

    test('parsing expression "3 * 5" returns [15/1]', () => {
        expect(parseExprNoParens(parseToTokens('3 * 5'))[0]).toEqualFraction(Fraction.parseString('15'))
    })

    test('parsing expression "15 / 5" returns [3/1]', () => {
        expect(parseExprNoParens(parseToTokens('15 / 5'))[0]).toEqualFraction(Fraction.parseString('3'))
    })

    test('parsing expression "3 + 5 + 10" returns [18/1]', () => {
        expect(parseExprNoParens(parseToTokens('3 + 5 + 10'))[0]).toEqualFraction(Fraction.parseString('18'))
    })

    test('parsing expression "3 + 5 * 10" returns [53/1]', () => {
        expect(parseExprNoParens(parseToTokens('3 + 5 * 10'))[0]).toEqualFraction(Fraction.parseString('53'))
    })

    test('parsing expression "3 / 3+5 *10" returns [51/1]', () => {
        expect(parseExprNoParens(parseToTokens('3 / 3+5 *10'))[0]).toEqualFraction(Fraction.parseString('51'))
    })
})

describe('parseExpression() function tests', () => {
    test('passing expression "3 * 5 + 10 / 2" returns 20/1', () => {
        expect(parseExpression('3 * 5 + 10 / 2')).toEqualFraction(Fraction.parseString('20'))
    })

    test('passing expression "(3 * 5) + (10 / 2)" returns 20/1', () => {
        expect(parseExpression('(3 * 5) + (10 / 2)')).toEqualFraction(Fraction.parseString('20'))
    })

    test('passing expression "3 * (5 + 10) / 3" returns 15/1', () => {
        expect(parseExpression('3 * (5 + 10) / 3')).toEqualFraction(Fraction.parseString('15'))
    })

    test('passing expression "(0 - 2) / 3" returns -2/3', () => {
        const e = parseExpression('(0 - 2) / 3')
        expect(e).toHaveProperty('numerator', -2n)
        expect(e).toHaveProperty('denominator', 3n)
    })
})