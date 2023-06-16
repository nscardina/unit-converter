/**
 * @license
 * MIT License
 * 
 * Copyright (c) 2023 Noah Scardina
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Regular expression which can be used to determine whether a string is a valid 
 * `BigInt`. If the string will successfully be parsed into a `bigint` primitive 
 * using the {@linkcode BigInt()} function, this regex's {@linkcode RegExp.test()} 
 * method will return `true`.
 */
const BigIntRegExp =
    /^\s*(?:0[box])?(?:(?<=^\s*)[\+-])?(?:(?<=^\s*\+?-?)\d*|(?<=^\s*0b\+?-?)[01]*|(?<=^\s*0o\+?-?)[0-7]*|(?<=^\s*0x\+?-?)[\da-fA-F]*)\s*$/

/**
 * Determines whether a particular value can be successfully converted to a 
 * `bigint` using the {@linkcode BigInt()} function. This function will return 
 * `true` when any of the following is true:
 * - `value` is a `bigint`.
 * - `value` is a `number` which is a 
 * {@linkplain https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger safe integer}.
 * - `value` is a `boolean`.
 * - `value` is a `string` which matches one of the following patterns:
 *      - [ optional whitespace ] [ optional unary `+` or unary `-` ] [ 0 or more decimal digits ] 
 * [ optional whitespace ]
 *      - [ optional whitespace ] `0x`[ 0 or more hexadecimal digits (0-9, A-F) ] [ optional whitespace ]
 *      - [ optional whitespace ] `0b`[ 0 or more binary digits (0 or 1) ] [ optional whitespace ]
 *      - [ optional whitespace ] `0o`[ 0 or more octal digits (0-7) ] [ optional whitespace ]
 * @param value value to test.
 * @returns whether `value` can be converted to a `bigint`.
 */
function isConvertibleToBigInt(value) {
    // A BigInt is automatically convertible to a BigInt
    if (typeof (value) === 'bigint') {
        return true
    }

    // A Number which is a safe integer is convertible to a BigInt. See MDN 
    // link for the exact definition of a safe integer.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
    if (typeof (value) === 'number' && Number.isSafeInteger(value)) {
        return true
    }

    // Booleans can be converted to BigInt; according to MDN, true is converted 
    // to 1n and false is converted to 0n.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/BigInt
    if (typeof (value) === 'boolean') {
        return true
    }

    // Strings can be converted to BigInt if they are like integer literals, as described in the JSDoc 
    // comment for this method.
    if (typeof (value) === 'string' && BigIntRegExp.test(value)) {
        return true
    }

    // If anything else is passed, the BigInt() constructor will return false
    return false
}

export default isConvertibleToBigInt