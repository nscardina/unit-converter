# convertible-to-bigint

[![License: MIT](https://img.shields.io/badge/license-MIT-informational)](./LICENSE)

A simple JavaScript / TypeScript library for determining whether a value can be converted to a JavaScript `bigint`.

## How to use

`convertible-to-bigint` is available as an ES6 module.

```js
import isConvertibleToBigInt from 'convertible-to-bigint'
```

One function, `isConvertibleToBigInt(value)`, is imported. This function will return `true` or `false` based on the input `value`. For example:

```js
// import the library
isConvertibleToBigInt(10) // returns true
isConvertibleToBigInt(3.14) // returns false
isConvertibleToBigInt(true) // returns true
isConvertibleToBigInt(10n) // returns true
isConvertibleToBigInt('10') // returns true
isConvertibleToBigInt('3.14') // returns false
```
