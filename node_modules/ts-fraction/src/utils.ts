import Fraction from "./fraction"

/**
 * Regex that represents the following pattern:
 * - zero or one `U+002D - HYPHEN MINUS` or `U+002B + PLUS SIGN` characters, followed by
 * - one or more digits (`0`-`9`).
 */
const INTEGER_STRING_REGEX: RegExp = /^[-\+]?\d+$/

/**
 * Regex that represents the following patterN:
 * - zero or one `U+002D - HYPHEN MINUS`) or `U+002B + PLUS SIGN` characters, followed by
 * - zero or more digits (`0`-`9`), possibly followed by 
 * - one `U+002E . FULL STOP` character and one or more digits (`0`-`9`).
 */
// export const DECIMAL_STRING_REGEX: RegExp = /^[-\+]?\d*(.\d+)?$/
export const DECIMAL_STRING_REGEX: RegExp = 
/^[-\+]?((\d*)(?=(\.\d+))|(\d+)(?!(\.\d+)))((\.\d+)(?<!([-\+]?\d+))|((\.\d+)?)(?<=([-\+]?\d+)))$/

export const DECIMAL_STRING_REGEX_BEGINNING = 
/^[-\+]?((\d*)(?=(\.\d+))|(\d+)(?!(\.\d+)))((\.\d+)(?<!([-\+]?\d+))|((\.\d+)?)(?<=([-\+]?\d+)))/

export const DECIMAL_STRING_REGEX_NO_BEGINNING_OR_END = 
/.*[-\+]?((\d*)(?=(\.\d+))|(\d+)(?!(\.\d+)))((\.\d+)(?<!([-\+]?\d+))|((\.\d+)?)(?<=([-\+]?\d+))).*/

/**
 * Determines whether a particular string `str` can be converted to a `bigint`. That is, this method 
 * checks if `str` matches the {@linkcode INTEGER_STRING_REGEX} pattern.
 * @param str string to test.
 * @returns whether the string can be converted to a `bigint`.
 */
export function canBeConvertedToBigInt(str: string) {
    return INTEGER_STRING_REGEX.test(str)
}

/**
 * Determines if a string is a decimal string; that is, if it matches the {@linkcode DECIMAL_STRING_REGEX} 
 * pattern and thus represents a decimal number.
 * @param str string to test.
 * @returns whether the string represents a decimal number.
 */
export function isDecimalString(str: string) {
    return INTEGER_STRING_REGEX.test(str)
}

/**
 * Determines whether a particular string `str` can be converted to a {@linkcode Fraction}. Currently, this 
 * method only checks whether a string which conforms to the {@linkcode DECIMAL_STRING_REGEX} pattern, as such 
 * a string can always be converted to a `Fraction` via the {@linkcode Fraction.parseString Fraction.parseString()} 
 * static method.
 * @param str string to test.
 * @returns whether the string can be converted to a `Fraction`.
 */
export function canBeConvertedToFraction(str: string) {
    return DECIMAL_STRING_REGEX.test(str)
}