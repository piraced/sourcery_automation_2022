const isTriangle = require('./isTriangle');

test('3, 4, 5 is triangle', () => {
    expect(isTriangle(3, 4, 5)).toBe(true);
});

test('30, 4, 5 is not triangle', () => {
    expect(isTriangle(30, 4, 5)).toBe(false);
});