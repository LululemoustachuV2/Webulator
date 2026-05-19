const { add } = require('./calc');

describe('calc.add', () => {
    test('additionne deux entiers positifs', () => {
        expect(add(2, 3)).toBe(5);
    });

    test('additionne un nombre positif et un nombre négatif', () => {
        expect(add(10, -4)).toBe(6);
    });

    test('additionne deux nombres négatifs', () => {
        expect(add(-7, -3)).toBe(-10);
    });

    test('additionne avec zéro', () => {
        expect(add(0, 0)).toBe(0);
        expect(add(42, 0)).toBe(42);
    });

    test('additionne des nombres décimaux', () => {
        expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('accepte des chaînes numériques', () => {
        expect(add('5', '7')).toBe(12);
    });

    test('lève une erreur pour un argument non numérique', () => {
        expect(() => add('abc', 2)).toThrow(TypeError);
        expect(() => add(undefined, 2)).toThrow(TypeError);
    });
});