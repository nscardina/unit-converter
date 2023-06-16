/**
 * Finds the greatest common divisor of two `bigint`s, using the 
 * {@link https://en.wikipedia.org/wiki/Binary_GCD_algorithm Binary GCD algorithm}.
 * @param u first `bigint`.
 * @param v second `bigint`.
 * @returns greatest common divisor of the two `bigint`s.
 */
function gcd(u: bigint, v: bigint): bigint {

    if (u < 0) u = -u
    if (v < 0) v = -v

    // Must multiply the gcd we find by this at the end.
    let finalCoefficient: bigint = 1n
    let uIsOdd;
    let vIsOdd;

    while (true) {

        if (u === 0n) return v * finalCoefficient
        if (v === 0n) return u * finalCoefficient

        uIsOdd = (u % 2n) === 1n
        vIsOdd = (v % 2n) === 1n

        if (!uIsOdd) {
            if (!vIsOdd) {
                finalCoefficient *= 2n
                u /= 2n
                v /= 2n
            } else {
                u /= 2n
            }
        } else {
            if (!vIsOdd) {
                v /= 2n
            } else {
                let difference = u - v
                if (difference < 0) difference = -difference
                v = (u > v) ? v : u
                u = difference
            }
        }
    }
}

export default gcd