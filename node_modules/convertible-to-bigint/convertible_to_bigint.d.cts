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
declare function isConvertibleToBigInt(value: any): boolean;
export = isConvertibleToBigInt