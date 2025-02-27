let numbers = [];
let target;
let expression = "";
let usedNumbers = [];
let solutionExpression = "";


function generateValidTarget() {
    let ops = ['+', '-', '*', '/'];
    let valid = false;
    while (!valid) {
        numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10) + 1);
        let expr = `${numbers[0]}`;
        let value = numbers[0];

        for (let i = 1; i < numbers.length; i++) {
            let op = ops[Math.floor(Math.random() * ops.length)];
            let num = numbers[i];

            if (op === '/' && (num === 0 || value % num !== 0)) {
                op = '+';
            }
            expr = `(${expr} ${op} ${num})`;
            value = eval(expr);
        }
        if (value > 50 && Number.isInteger(value)) {
            valid = true;
            target = value;
            solutionExpression = expr;
        }
    }
}

function initGame() {
    generateValidTarget();
    usedNumbers = [];
    document.getElementById('numbers').innerHTML = numbers.map(num => `<button class='num-btn' onclick='addToExpression(${num}, this)'>${num}</button>`).join(' ');
    document.getElementById('target').textContent = target;
    document.getElementById('expression').textContent = "";
    document.getElementById('result').textContent = "";
}

function addToExpression(value, btn) {
    expression += ` ${value} `;
    document.getElementById('expression').textContent = expression;
    usedNumbers.push({ value, btn });
    btn.classList.add('used');
    btn.disabled = true;
}

function deleteLastCharacter() {
    if (usedNumbers.length > 0) {
        let lastUsed = usedNumbers.pop();
        let valueToRemove = lastUsed.value.toString();
        expression = expression.trim().slice(0, -(valueToRemove.length + 2)).trim();
        document.getElementById('expression').textContent = expression;
        lastUsed.btn.classList.remove('used');
        lastUsed.btn.disabled = false;
    }
}

function clearExpression() {
    expression = "";
    document.getElementById('expression').textContent = "";
    document.getElementById('result').textContent = "";
    document.querySelectorAll('.num-btn').forEach(btn => {
        btn.classList.remove('used');
        btn.disabled = false;
    });
    usedNumbers = [];
}

function checkResult() {
    try {
        let result = eval(expression);
        if (!Number.isFinite(result) || Number.isNaN(result)) {
            throw new Error("Division par zéro ou expression invalide");
        }
        if (result === target) {
            document.getElementById('result').textContent = "Bravo ! Vous avez trouvé le bon compte !";
        } else {
            document.getElementById('result').textContent = "Essayez encore. Résultat obtenu: " + result;
        }
    } catch (e) {
        document.getElementById('result').textContent = "Expression invalide";
    }
}

function showSolution() {
    document.getElementById('result').textContent = "Solution: " + solutionExpression;
}

initGame();