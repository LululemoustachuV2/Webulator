/**
 * Calculatrice Webulator
 * Contient :
 *  - la fonction de calcul add
 *  - la logique d’interface (clics, affichage)
 */

function toNumber(value) {
    const n = Number(value);
    if (Number.isNaN(n)) {
        throw new TypeError('Les deux arguments doivent être des nombres valides.');
    }
    return n;
}

function add(a, b) {
    return toNumber(a) + toNumber(b);
}

const Calc = { add };

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calc;
}

if (typeof window !== 'undefined') {
    window.Calc = Calc;
}


if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        const resultEl = document.getElementById('result');
        const historyEl = document.getElementById('history');
        if (!resultEl || !historyEl) return;

        const state = {
            current: '0',
            previous: null,
            operator: null,
            justEvaluated: false,
        };

        function format(value) {
            if (typeof value === 'number') {
                return String(Number(value.toFixed(10)));
            }
            return String(value).replace('.', ',');
        }

        function render() {
            resultEl.textContent = format(state.current);
            if (state.previous !== null && state.operator) {
                historyEl.textContent = `${format(state.previous)} ${state.operator}`;
            } else {
                historyEl.textContent = '';
            }
        }

        function inputNumber(digit) {
            if (state.justEvaluated) {
                state.current = '0';
                state.justEvaluated = false;
            }
            state.current = state.current === '0' ? digit : state.current + digit;
            render();
        }

        function inputDecimal() {
            if (state.justEvaluated) {
                state.current = '0';
                state.justEvaluated = false;
            }
            if (!state.current.includes('.')) {
                state.current += '.';
            }
            render();
        }

        function compute(a, b, operator) {
            if (operator === '+') {
                return add(a, b);
            }
            return b;
        }

        function chooseOperator(operator) {
            if (operator !== '+') return;

            if (state.previous !== null && state.operator && !state.justEvaluated) {
                try {
                    const result = compute(state.previous, state.current, state.operator);
                    state.previous = result;
                    state.current = String(result);
                } catch (err) {
                    resultEl.textContent = 'Erreur';
                    state.previous = null;
                    state.operator = null;
                    state.current = '0';
                    state.justEvaluated = true;
                    return;
                }
            } else {
                state.previous = state.current;
            }
            state.operator = operator;
            state.justEvaluated = false;
            state.current = '0';
            render();
        }

        function evaluate() {
            if (state.previous === null || state.operator === null) return;
            try {
                const result = compute(state.previous, state.current, state.operator);
                historyEl.textContent =
                    `${format(state.previous)} ${state.operator} ${format(state.current)} =`;
                state.current = String(result);
                state.previous = null;
                state.operator = null;
                state.justEvaluated = true;
                resultEl.textContent = format(state.current);
            } catch (err) {
                resultEl.textContent = 'Erreur';
                historyEl.textContent = err.message;
                state.previous = null;
                state.operator = null;
                state.current = '0';
                state.justEvaluated = true;
            }
        }

        document.querySelectorAll('.btn-number[data-number]').forEach(function (btn) {
            btn.addEventListener('click', function () { inputNumber(btn.dataset.number); });
        });

        document.querySelectorAll('.btn-operator[data-operator]').forEach(function (btn) {
            btn.addEventListener('click', function () { chooseOperator(btn.dataset.operator); });
        });

        const decimalBtn = document.getElementById('decimal');
        if (decimalBtn) decimalBtn.addEventListener('click', inputDecimal);

        const equalBtn = document.getElementById('equal');
        if (equalBtn) equalBtn.addEventListener('click', evaluate);

        render();
    });
}
