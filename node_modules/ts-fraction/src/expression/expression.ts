import TokenType from "./tokentype"
import Fraction from "../fraction"

import type { TokenTypeInstance } from "./tokentype"

/**
 * Returns an array containing
 * - in index `0`, a {@linkcode TokenTypeInstance}, 
 * - in index `1`, the `string` at the beginning of the `str` parameter which matches the 
 * `TokenTypeInstance`'s {@linkcode TokenTypeInstance.startingRegex startingRegex}, and 
 * - if the `TokenTypeInstance` is {@linkcode TokenType.Number}, in index `2`, this method 
 * returns the {@linkcode Fraction} which is created by parsing the `str` parameter.
 * @param str string to process.
 * @returns array, as described above, or `null` if no valid token is found.
 * @throws {@linkcode InvalidTokenError} if the {@linkcode Fraction.parseString()} method throws.
 */
function matchTokenAtBeginningOfString(str: string): [TokenTypeInstance, string, Fraction?] | null {

    for (const token of Object.values(TokenType)) {
        if (token.startingRegex.test(str)) {

            // Token matches the beginning of the string
            if (token === TokenType.Number) {

                // We know this will always succeed because we know the token's startingRegex 
                // matches the beginning of the string, but TypeScript doesn't know that so 
                // include !. Also return only the first match - there should be only one match, 
                // given that the startingRegex tests only for values at the beginning of the 
                // string.
                const matchedStringArray = str.match(token.startingRegex)!
                try {
                    return [token, str.replace(token.startingRegex, ''),
                        Fraction.parseString(matchedStringArray[0])]
                } catch (err) {
                    if (err instanceof Error && err.message === 'Invalid string: Cannot be converted to Fraction') {
                        throw new InvalidTokenError(`Invalid number ${matchedStringArray[0]} cannot be converted to Fraction`)
                    }
                }
            }

            return [token, str.replace(token.startingRegex, '')]
        }
    }

    // No tokens match the beginning of the string.
    return null
}

/**
 * Parses a `string` into an array of objects, which represent the operators and 
 * terms of an expression. These objects will either be {@linkcode TokenTypeInstance}
 * objects or {@linkcode Fraction} objects. If any invalid tokens are encountered, 
 * a {@linkcode InvalidTokenError} will be thrown.
 * @param str `string` to parse.
 * @returns array of objects representing the terms and operators in `str`.
 * @throws `InvalidTokenError` if characters which do not match any known token type 
 * are found in the the `str` argument.
 */
function parseToTokens(str: string): (TokenTypeInstance | Fraction)[] {

    let tokens: (TokenTypeInstance | Fraction)[] = []

    str = removeAllWhitespace(str)

    while (str.length > 0) {
        const token = matchTokenAtBeginningOfString(str)
        if (token !== null) {
            if (token[2] !== undefined) {
                tokens.push(token[2])
            } else {
                tokens.push(token[0])
            }
            str = token[1]
        } else {
            throw new InvalidTokenError(`Invalid token at: ${str}`)
        }
    }

    return tokens
}

/**
 * Removes all whitespace characters from a string `str` (that is, any characters that are 
 * matched by the `\s` regex character class. See 
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes this MDN page}
 * for details.)
 * @param str string to remove whitespace from.
 * @returns string, after any whitespace is removed.
 */
function removeAllWhitespace(str: string) {
    return str.replace(/\s*/g, '')
}

/**
 * Finds the first pair of matching parentheses in an array of either {@linkcode TokenTypeInstance} or 
 * {@linkcode Fraction} objects, and returns the indices of those parentheses in an array with two 
 * elements. In other words, this method finds the first occurrence of `( U+0028 LEFT PARENTHESIS` which 
 * has a `) U+0029 RIGHT PARENTHESIS` character after it with no other occurrences of `(` between that 
 * left and right parenthesis. There can be any number of other characters between the left and right 
 * parentheses, though. If no parentheses of either type are found, `null` is returned. If an unmatched 
 * parenthesis is found, an {@linkcode UnmatchedParenthesisError} is throws indicating which parenthesis 
 * is present in the string and is unmatched.
 * @param expr array of `TokenTypeInstance`s and `Fraction`s to parse.
 * @returns array of the form `[<index of left parenthesis>, <index of right parenthesis>]`
 * @throws `UnmatchedParenthesisError` if an unequal number of left and right parentheses are present 
 * in the string.
 */
function findFirstMatchingParentheses(expr: (TokenTypeInstance | Fraction)[]): [number, number] | null {
    let leftIndex = -1;

    for (let i = 0; i < expr.length; i++) {

        if (expr[i] === TokenType.LeftParenthesisOperator) {
            leftIndex = i
        } else if (expr[i] === TokenType.RightParenthesisOperator) {
            if (leftIndex === -1) {
                throw new UnmatchedParenthesisError('Unmatched )')
            }
            return [leftIndex, i]
        }
    }

    if (leftIndex !== -1) {
        throw new UnmatchedParenthesisError('Unmatched (')
    }

    return null
}

/**
 * Parses an expression contained within an array of either {@linkcode Fraction} or 
 * {@linkcode TokenTypeInstance} objects, assuming that this array contains no 
 * parentheses (that is, it does not contain {@linkcode TokenType.LeftParenthesisOperator} 
 * or {@linkcode TokenType.RightParenthesisOperator}). The expression will be evaluated 
 * by the normal arithmetic order of operators, such that any multiplication and division 
 * operations are evaluated first, from left to right, and then addition and subtraction 
 * operations are evaluated from left to right. The result is then returned.
 * @param expr expression to parse.
 * @returns result of the calculation.
 * @throws `EvaluationError` if an operator does not have either of its operands as required.
 */
function parseExprNoParens(expr: (Fraction | TokenTypeInstance)[]) {
    // Solve multiplication/division
    while (expr.includes(TokenType.MultiplicationOperator) || expr.includes(TokenType.DivisionOperator)) {
        const index = expr.findIndex(
            elem => elem === TokenType.MultiplicationOperator || elem === TokenType.DivisionOperator)

        if (index - 1 < 0) {
            throw new EvaluationError(`${
                expr[index] === TokenType.MultiplicationOperator ? 'Multiplication' : 'Division'
            } operator at index ${index} has no left operand`)
        }

        if (index + 1 >= expr.length) {
            throw new EvaluationError(`${
                expr[index] === TokenType.MultiplicationOperator ? 'Multiplication' : 'Division'
            } operator at index ${index} has no right operand`)
        }

        if (expr[index - 1] instanceof Fraction && expr[index + 1] instanceof Fraction) {
            expr[index - 1] = expr[index - 1]
            if (expr[index] === TokenType.MultiplicationOperator) {
                expr.splice(index - 1, 3, (expr[index - 1] as Fraction).times(expr[index + 1] as Fraction))
            } else {
                expr.splice(index - 1, 3, (expr[index - 1] as Fraction).div(expr[index + 1] as Fraction))
            }
        } else {
            throw new EvaluationError(`${
                !(expr[index - 1] instanceof Fraction) ? `${
                    (expr[index] === TokenType.MultiplicationOperator) ? `Multiplication` : `Division`
                } operator at index ${index - 1}` : ''
            } ${
                !(expr[index - 1] instanceof Fraction) && !(expr[index + 1] instanceof Fraction) ? `and ` : ''
            }${
                !(expr[index + 1] instanceof Fraction) ? `${
                    (expr[index] === TokenType.MultiplicationOperator) ? `Multiplication` : `Division`
                } operator at index ${index + 1} ` : ''
            }has no ${
                !(expr[index - 1] instanceof Fraction) ? 'left' : ''
            } ${
                !(expr[index - 1] instanceof Fraction) && !(expr[index + 1] instanceof Fraction) ? `or ` : ''
            }${
                !(expr[index + 1] instanceof Fraction) ? 'right ' : ''
            }operand`)
        }
    }

    // Solve addition/subtraction
    while (expr.includes(TokenType.AdditionOperator) || expr.includes(TokenType.SubtractionOperator)) {
        const index = expr.findIndex(
            elem => elem === TokenType.AdditionOperator || elem === TokenType.SubtractionOperator)

        if (index - 1 < 0) {
            throw new EvaluationError(`${
                expr[index] === TokenType.AdditionOperator ? 'Addition' : 'Subtraction'
            } operator at index ${index} has no left operand`)
        }

        if (index + 1 >= expr.length) {
            throw new EvaluationError(`${
                expr[index] === TokenType.AdditionOperator ? 'Addition' : 'Subtraction'
            } operator at index ${index} has no right operand`)
        }

        if (expr[index - 1] instanceof Fraction && expr[index + 1] instanceof Fraction) {
            expr[index - 1] = expr[index - 1]
            if (expr[index] === TokenType.AdditionOperator) {
                expr.splice(index - 1, 3, (expr[index - 1] as Fraction).plus(expr[index + 1] as Fraction))
            } else {
                expr.splice(index - 1, 3, (expr[index - 1] as Fraction).minus(expr[index + 1] as Fraction))
            }
        } else {
            throw new EvaluationError(`${
                !(expr[index - 1] instanceof Fraction) ? `${
                    (expr[index] === TokenType.AdditionOperator) ? `Addition` : `Subtraction`
                } operator at index ${index - 1}` : ''
            } ${
                !(expr[index - 1] instanceof Fraction) && !(expr[index + 1] instanceof Fraction) ? `and ` : ''
            }${
                !(expr[index + 1] instanceof Fraction) ? `${
                    (expr[index] === TokenType.AdditionOperator) ? `Addition` : `Subtraction`
                } operator at index ${index + 1} ` : ''
            }has no ${
                !(expr[index - 1] instanceof Fraction) ? 'left' : ''
            } ${
                !(expr[index - 1] instanceof Fraction) && !(expr[index + 1] instanceof Fraction) ? `or ` : ''
            }${
                !(expr[index + 1] instanceof Fraction) ? 'right ' : ''
            }operand`)
        }
    }

    return expr
}

/**
 * Parses an arithmetic expression passed as a `string`, calculating the result as a `Fraction`.
 * 
 * ## Valid characters in expressions
 * 
 * Expressions can be made up of the following characters:
 * 
 * - Digits `0`-`9`
 * - Arithmetic operators `+`, `-`, `*`, and `/`
 * - Left and right parentheses `(` and `)`
 * - Whitespace (any character matched by the `\s` `RegExp` character class escape; see 
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape#s this MDN page} 
 * for more information)
 * 
 * ## How expressions are evaluated
 * 
 * Expressions are evaluated according to the {@link https://en.wikipedia.org/wiki/Order_of_operations order of operations}; 
 * that is, the evaluation order is
 * 
 * 1. expressions inside parentheses
 * 1. multiplication and division
 * 1. addition and subtraction
 * 
 * Note that exponentiation and other functions are currently not supported.
 * 
 * ## Possible errors
 * 
 * Invalid expressions can cause this method to throw multiple exceptions, as detailed below:
 * - If any characters are included which are not listed above, {@linkcode InvalidTokenError} will 
 * be thrown.
 * - If any numbers are included which cannot successfully be parsed into {@linkcode Fraction} objects 
 * via the {@linkcode Fraction.parseString()} method, {@linkcode InvalidTokenError} will be thrown.
 * - If the expression contains unmatched parentheses, {@linkcode UnmatchedParenthesisError} will be 
 * thrown.
 * - If the final result of the calculation does not end up being a `Fraction` object somehow, 
 * {@linkcode InvalidTokenError} will be thrown.
 * - If any operator does not have both of its required operands, {@linkcode EvaluationError} will be 
 * thrown.
 * - If the expression does not have at least one term, an {@linkcode Error} will be thrown.
 * @param expr expression to parse.
 * @returns result of evaluating the expression, as a {@linkcode Fraction}.
 */
function parseExpression(expr: string): Fraction {
    // Step 1: Parse expr into an array of tokens. Each number should be a token, and 
    // each operator should be a token.
    let tokens = parseToTokens(expr)

    while (tokens.length >= 1) {
        // Step 2: Find the next expression in a set of parentheses to parse, if one exists.
        const matchingParenthesesIndices = findFirstMatchingParentheses(tokens)
        if (matchingParenthesesIndices !== null) {
            // If there are any matching parentheses
            const newToken = parseExprNoParens(tokens.splice(
                matchingParenthesesIndices[0] + 1, matchingParenthesesIndices[1] - matchingParenthesesIndices[0] - 1))
            tokens.splice(matchingParenthesesIndices[0], 2, ...newToken)
        } else {
            const finalToken = parseExprNoParens(tokens)
            if (finalToken[0] instanceof Fraction) {
                return finalToken[0]
            } else {
                throw new InvalidTokenError(`Invalid final token ${finalToken[0]}; not a fraction`)
            }
        }
    }

    throw new Error(`Expression must have at least one term`)
}

export {
    parseToTokens,
    matchTokenAtBeginningOfString,
    removeAllWhitespace,
    findFirstMatchingParentheses,
    parseExprNoParens,
    parseExpression,
}