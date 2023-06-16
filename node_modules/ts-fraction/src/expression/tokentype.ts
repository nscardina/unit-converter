import { DECIMAL_STRING_REGEX_BEGINNING } from "../utils"

/**
 * Type representing one single {@linkcode TokenType}, and holds all relevant data. 
 * This data is, currently, a {@linkcode RegExp} used for determining whether the 
 * beginning of a `string` matches this type of token.
 */
type TokenTypeInstance = Readonly<{
    startingRegex: RegExp
}>

/**
 * Object holding several different `TokenTypeInstances`:
 * - `AdditionOperator`, which matches `+ U+002B PLUS SIGN`;
 * - `SubtractionOperator`, which matches `- U+002D HYPHEN-MINUS`;
 * - `MultiplicationOperator`, which matches `* U+002A ASTERISK`;
 * - `DivisionOperator`, which matches `/ U+002F SOLIDUS`;
 * - `LeftParenthesisOperator`, which matches `( U+0028 LEFT PARENTHESIS`;
 * - `RightParenthesisOperator`, which matches `) U+0029 RIGHT PARENTHESIS`;
 * - `Number`, which matches {@linkcode DECIMAL_STRING_REGEX_BEGINNING}.
 */
const TokenType: {
    AdditionOperator: TokenTypeInstance,
    SubtractionOperator: TokenTypeInstance,
    MultiplicationOperator: TokenTypeInstance,
    DivisionOperator: TokenTypeInstance, 
    LeftParenthesisOperator: TokenTypeInstance,
    RightParenthesisOperator: TokenTypeInstance,
    Number: TokenTypeInstance
} = Object.freeze({
    AdditionOperator: Object.freeze({
        startingRegex: /^\+/
    }),
    SubtractionOperator: Object.freeze({
        startingRegex: /^-/
    }),
    MultiplicationOperator: Object.freeze({
        startingRegex: /^\*/
    }),
    DivisionOperator: Object.freeze({
        startingRegex: /^\//
    }),
    LeftParenthesisOperator: Object.freeze({
        startingRegex: /^\(/
    }),
    RightParenthesisOperator: Object.freeze({
        startingRegex: /^\)/
    }),
    Number: Object.freeze({
        startingRegex: DECIMAL_STRING_REGEX_BEGINNING
    })
})

export type { TokenTypeInstance }
export default TokenType