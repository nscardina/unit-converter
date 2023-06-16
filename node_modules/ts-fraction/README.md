# ts-fraction - a TypeScript fraction library

[![License: MIT](https://img.shields.io/badge/license-MIT-informational)](./LICENSE)

`ts-fraction` is a simple arbitrary-precision fraction library written in TypeScript.

## How to use

### Constructing

You can create a `Fraction` object which represents $\dfrac12$ in one of the following ways:

```ts
import Fraction, { parseExpression } from 'ts-fraction'

// Constructing from two numbers 1 and 2
const frac1 = new Fraction(1, 2)

// Constructing from a decimal string
const frac3 = Fraction.parseString('0.5')

// Constructing from an arithmetic expression
const frac4 = parseExpression('1 + (-2 / 4)')
```

There are many other ways to construct `Fraction` objects too, including from `string`s, `bigints`, and other `Fraction`s. Consult the documentation of the Fraction constructor for more information.

### Operations

`Fraction` objects currently support the following operations:

#### Addition

To evaluate $\frac12+\frac23$:

```ts
const result = new Fraction(1, 2).plus(new Fraction(2, 3))
result.equals(new Fraction(7, 6)) // true
```

#### Subtraction

To evaluate $\frac12-\frac23$:

```ts
const result = new Fraction(1, 2).minus(new Fraction(2, 3))
result.equals(new Fraction(-1, 6)) // true
```

#### Multiplication

To evaluate $\frac12\times\frac23$:

```ts
const result = new Fraction(1, 2).times(new Fraction(2, 3))
result.equals(new Fraction(1, 3)) // true
```

#### Division

To evaluate $\frac12\div\frac23$:

```ts
const result = new Fraction(1, 2).div(new Fraction(2, 3))
result.equals(new Fraction(3, 4)) // true
```

#### Testing for equality

To test for equality among two `Fraction`s, use the `equals()` method:

```ts
new Fraction(1, 2).equals(new Fraction(2, 4)) // true
new Fraction(1, 2).equals(new Fraction(2, 3)) // false
```
