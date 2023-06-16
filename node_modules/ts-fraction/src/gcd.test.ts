import gcd from "./gcd";



test('finds gcd(0n, 1n) to equal 1', () => {
    expect(gcd(0n, 1n)).toBe(1n)
})

test('finds gcd(1n, 0n) to equal 1', () => {
    expect(gcd(1n, 0n)).toBe(1n)
})

test('find gcd(2n, 2n) to equal 2', () => {
    expect(gcd(2n, 2n)).toBe(2n)
})

test('find gcd(9n, 6n) to equal 3', () => {
    expect(gcd(9n, 6n)).toBe(3n)
})

test('find gcd(6n, 9n) to equal 3', () => {
    expect(gcd(6n, 9n)).toBe(3n)
})

test('find gcd(-6n, 9n) to equal 3', () => {
    expect(gcd(-6n, 9n) === 3n).toBe(true)
})