import {expect} from '@jest/globals'
import type { MatcherFunction } from 'expect'
import Fraction from './fraction'

const toEqualFraction: MatcherFunction<[otherFraction: unknown]> = 
function (thisFraction, otherFraction) {
    if (!(thisFraction instanceof Fraction) || !(otherFraction instanceof Fraction)) {
        throw new Error(`${
            !(thisFraction instanceof Fraction) ? `'1${thisFraction}'` : ''
        }${
            !(otherFraction instanceof Fraction) ? `'2${otherFraction}'` : ''
        } must be a Fraction object`)
    }

    const numeratorsEqual = thisFraction.numerator === otherFraction.numerator
    const denominatorsEqual = thisFraction.denominator === otherFraction.denominator

    if (!numeratorsEqual || !denominatorsEqual) {
        return {
            message: () => `expected ${(!numeratorsEqual) ? `numerators '${thisFraction.numerator}', '${otherFraction.numerator}'` : 
            ''}${(!numeratorsEqual && !denominatorsEqual) ? ` and ` : ''}${(!denominatorsEqual) ? 
            `denominators '${thisFraction.denominator}', '${otherFraction.denominator}'` : ''} to be equal`,
            pass: false
        }
    } else {
        return {
            message: () => `expected ${(!numeratorsEqual) ? `numerators '${thisFraction.numerator}', '${otherFraction.numerator}'` : 
            ''}${(!numeratorsEqual && !denominatorsEqual) ? ` and ` : ''}${(!denominatorsEqual) ? 
            `denominators '${thisFraction.denominator}', '${otherFraction.denominator}'` : ''} to be equal`,
            pass: true
        }
    }
}

expect.extend({
    toEqualFraction,
})

declare module 'expect' {
    interface AsymmetricMatchers {
        toEqualFraction(otherFraction: Fraction): void
    }
    interface Matchers<R> {
        toEqualFraction(otherFraction: Fraction): R
    }
}