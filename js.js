const calculator = {
  num1: undefined,
  operator: undefined,
  num2: undefined,
  num1Complete: false,
  justGotResult: false,
  alreadyUsedDot: false,
};

const display = document.querySelector(".displayResult");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const prevCalculation = document.querySelector(".prevCalculation");

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return Math.round((a / b) * Math.pow(10, 10)) / Math.pow(10, 10);
}

function operate(num1, operator, num2) {
  let result;
  switch (operator) {
    case "addition":
      result = add(num1, num2);
      break;
    case "subtraction":
      result = subtract(num1, num2);
      break;
    case "multiplication":
      result = multiply(num1, num2);
      break;
    case "division":
      result = divide(num1, num2);
      break;
    default:
      break;
  }
  return result;
}

function updateNumbers(input) {
  let num = "";
  if (calculator.num1 !== undefined && calculator.num1Complete === false) {
    num = String(calculator.num1);
  }
  if (calculator.num1Complete === true && calculator.num2 !== undefined) {
    num = String(calculator.num2);
  }
  switch (input) {
    case "nine":
      num += "9";
      break;
    case "eight":
      num += "8";
      break;
    case "seven":
      num += "7";
      break;
    case "six":
      num += "6";
      break;
    case "five":
      num += "5";
      break;
    case "four":
      num += "4";
      break;
    case "three":
      num += "3";
      break;
    case "two":
      num += "2";
      break;
    case "one":
      num += "1";
      break;
    case "zero":
      num += "0";
      break;
    case "dot":
      num += ".";
      calculator.alreadyUsedDot = true;
      break;
    default:
      break;
  }
  return num;
}

function clearCalculator() {
  calculator.num1 = undefined;
  calculator.operator = undefined;
  calculator.num2 = undefined;
  calculator.num1Complete = false;
  calculator.justGotResult = false;
  calculator.alreadyUsedDot = false;
  prevCalculation.textContent = "";
}

function getOperator(op) {
  switch (op) {
    case "addition":
      return "+";
      break;
    case "subtraction":
      return "-";
      break;
    case "multiplication":
      return "*";
      break;
    case "division":
      return "/";
      break;
    default:
      break;
  }
}

numbers.forEach((num) => {
  num.addEventListener("click", () => {
    if (calculator.justGotResult) {
      clearCalculator();
    }
    if (num.id !== "dot" || calculator.alreadyUsedDot === false) {
      if (calculator.num1Complete === false) {
        calculator.num1 = updateNumbers(num.id);
        display.textContent = calculator.num1;
      } else {
        calculator.num2 = updateNumbers(num.id);
        display.textContent = calculator.num2;
      }
    }
    console.log(`num1 ${calculator.num1}`);
    console.log(`num2 ${calculator.num2}`);
    console.log(`operator ${calculator.operator}`);
  });
});

operators.forEach((input) => {
  input.addEventListener("click", () => {
    calculator.alreadyUsedDot = false;
    //calculate the prev operation
    if (
      calculator.operator !== undefined &&
      calculator.num1 !== undefined &&
      calculator.num2 !== undefined
    ) {
      prevCalculation.textContent = `${calculator.num1} ${getOperator(calculator.operator)} ${calculator.num2}`;
      calculator.num1 = operate(
        calculator.num1,
        calculator.operator,
        calculator.num2,
      );
      if (!Number.isFinite(calculator.num1)) {
        clearCalculator();
        display.textContent = "Don't do that!";
      } else {
        calculator.num1Complete = true;
        display.textContent = calculator.num1;
        calculator.justGotResult = true;
        calculator.num2 = undefined;
      }
    }

    if (calculator.num1 !== undefined && input.id !== "result") {
      calculator.num1Complete = true;
      calculator.operator = input.id;
      calculator.justGotResult = false;
    }

    console.log(`num1 ${calculator.num1}`);
    console.log(`num2 ${calculator.num2}`);
    console.log(`operator ${calculator.operator}`);
  });
});

clear.addEventListener("click", () => {
  clearCalculator();
  display.textContent = "";
});

backspace.addEventListener("click", () => {
  if (
    calculator.num2 === undefined &&
    calculator.num1 !== undefined &&
    calculator.num1Complete === false
  ) {
    calculator.num1 = calculator.num1.slice(0, -1);
    display.textContent = calculator.num1;
  } else if (calculator.num2 !== undefined) {
    calculator.num2 = calculator.num2.slice(0, -1);
    display.textContent = calculator.num2;
  }
});
