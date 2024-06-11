const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

function handleNumber(number) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = number;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? number : displayValue + number;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        case '%':
            return (firstOperand / 100) * secondOperand;
        default:
            return secondOperand;
    }
}

function handleSquare() {
    const { displayValue } = calculator;
    const inputValue = parseFloat(displayValue);
    calculator.displayValue = String(inputValue * inputValue);
    calculator.waitingForSecondOperand = true;
}

function handleSquareRoot() {
    const { displayValue } = calculator;
    const inputValue = parseFloat(displayValue);
    calculator.displayValue = String(Math.sqrt(inputValue));
    calculator.waitingForSecondOperand = true;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('equal-sign')) {
        handleOperator(calculator.operator);
        updateDisplay();
        return;
    }

    if (target.classList.contains('square')) {
        handleSquare();
        updateDisplay();
        return;
    }

    if (target.classList.contains('square-root')) {
        handleSquareRoot();
        updateDisplay();
        return;
    }

    handleNumber(target.value);
    updateDisplay();
});