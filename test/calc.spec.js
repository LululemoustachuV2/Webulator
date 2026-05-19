const { add } = require('../calc');

describe('Spécifications fonctionnelles - addition', () => {
    test('l\'addition est commutative : a + b === b + a', () => {
        expect(add(3, 8)).toBe(add(8, 3));
    });

    test('l\'addition est associative : (a + b) + c === a + (b + c)', () => {
        const a = 2;
        const b = 5;
        const c = 9;
        expect(add(add(a, b), c)).toBe(add(a, add(b, c)));
    });

    test('zéro est l\'élément neutre de l\'addition', () => {
        expect(add(123, 0)).toBe(123);
        expect(add(0, -45)).toBe(-45);
    });

    test('gère les grands nombres', () => {
        expect(add(1_000_000, 2_500_000)).toBe(3_500_000);
    });

    test('renvoie un nombre (type number)', () => {
        expect(typeof add(1, 2)).toBe('number');
    });
});
