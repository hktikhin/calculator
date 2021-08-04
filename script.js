
const keyType = {
    digit: 1,
    opeartor: 2,
}

// variable to use 
let tempDigit = "0";
let lastKeyType = keyType.digit;
let num1 = null;
let num2 = null;
let operator = null;
let expressionText = "";


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    let result;
    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "×":
            result = multiply(a, b);
            break;
        case "÷":
            result = divide(a, b);
            break;
    }
    return result;
}
function updateInputDigit(event) {
    if (tempDigit === "0" || lastKeyType === keyType.opeartor) {
        tempDigit = this.textContent;
    }
    else {
        tempDigit += this.textContent;
    }
    lastKeyType = keyType.digit;
    screenInputNode.textContent = `${tempDigit}`;
}

function doOperation(event) {
    // check whether last key type is digit and num1 have been stored
    if (lastKeyType === keyType.digit && num1 !== null) {
        num2 = +tempDigit;
        let result = operate(operator, num1, num2);
        num1 = result;
        tempDigit = result + "";
        if (result === Infinity) {
            clearMemory();
            screenInputNode.textContent = `${result}`;
            return;
        }
        screenInputNode.textContent = `${result}`;
    }
    else if (lastKeyType === keyType.digit) {
        num1 = +tempDigit;
    }

    if (this.textContent === "=") {
        // check whether calculator is in initial state and last key type is operator
        if (operator !== null && lastKeyType !== keyType.opeartor) {
            expressionText += ` ${num2} =  `
        }
        else if (lastKeyType === keyType.opeartor) {
            expressionText = ""
        }
        // restore in inital state 
        lastKeyType = keyType.digit;
        num1 = null;
        operator = null;
    }
    else {
        lastKeyType = keyType.opeartor;
        operator = this.textContent;
        expressionText = `${num1} ${operator}`;
    }
    screenExpressionNode.textContent = `${expressionText}`;
}

function clearMemory(event) {
    tempDigit = "0";
    expressionText = "";
    lastKeyType = keyType.digit;
    num1 = null;
    num2 = null;
    operator = null;
    screenInputNode.textContent = `${tempDigit}`;
    screenExpressionNode.textContent = `${expressionText}`;
}

function deleteDigit(event) {
    tempDigit = tempDigit.slice(0, -1);
    screenInputNode.textContent = `${tempDigit}`;
    screenExpressionNode.textContent = `${expressionText}`;
}

function addDecimal(event) {
    if (!tempDigit.includes(".")) tempDigit += ".";
    screenInputNode.textContent = `${tempDigit}`;
}


const screenInputNode = document.querySelector(".input");
const screenExpressionNode = document.querySelector(".expression");

const digitKeys = Array.from(document.querySelectorAll(".digit-key"));
const operatorKeys = Array.from(document.querySelectorAll(".operator-key"));
const deleteKey = document.querySelector(".delete-key");
const clearKey = document.querySelector(".clear-key");
const decimalKey = document.querySelector(".decimal-key");

console.log(digitKeys);
console.log(operatorKeys);

digitKeys.forEach(element => {
    element.addEventListener("click", updateInputDigit);
});

operatorKeys.forEach(element => {
    element.addEventListener("click", doOperation);
});

clearKey.addEventListener("click", clearMemory)

deleteKey.addEventListener("click", deleteDigit)

decimalKey.addEventListener("click", addDecimal)