/**
 * Module d'opérations de la calculatrice.
 * Compatible Node.js (CommonJS) et navigateur (objet global `Calc`).
 */

function add(a, b) {
    const numA = Number(a);
    const numB = Number(b);

    if (Number.isNaN(numA) || Number.isNaN(numB)) {
        throw new TypeError('Les deux arguments doivent être des nombres valides.');
    }

    return numA + numB;
}

const Calc = { add };

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calc;
}

if (typeof window !== 'undefined') {
    window.Calc = Calc;
}
