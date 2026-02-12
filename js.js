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
  return (
    Math.round((Number(a) + Number(b)) * Math.pow(10, 10)) / Math.pow(10, 10)
  );
}

function subtract(a, b) {
  return Math.round((a - b) * Math.pow(10, 10)) / Math.pow(10, 10);
}

function multiply(a, b) {
  return Math.round(a * b * Math.pow(10, 10)) / Math.pow(10, 10);
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

function numbersListener(num) {
  if (calculator.justGotResult) {
    clearCalculator();
  }
  if (num !== "dot" || calculator.alreadyUsedDot === false) {
    if (calculator.num1Complete === false) {
      calculator.num1 = updateNumbers(num);
      display.textContent = calculator.num1;
    } else {
      calculator.num2 = updateNumbers(num);
      display.textContent = calculator.num2;
    }
  }
}

function operatorsListener(input) {
  calculator.alreadyUsedDot = false;
  //calculate the prev operation
  if (
    calculator.operator !== undefined &&
    calculator.num1 !== undefined &&
    calculator.num2 !== undefined
  ) {
    prevCalculation.textContent = `${Number(calculator.num1)} ${getOperator(calculator.operator)} ${Number(calculator.num2)}`;
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

  if (calculator.num1 !== undefined && input !== "result") {
    calculator.num1Complete = true;
    calculator.operator = input;
    calculator.justGotResult = false;
  }
}

function clearListener() {
  clearCalculator();
  display.textContent = "";
}

function backspaceListener() {
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
}

function numbersToText(num) {
  switch (num) {
    case "0":
      return "zero";
      break;
    case "1":
      return "one";
      break;
    case "2":
      return "two";
      break;
    case "3":
      return "three";
      break;
    case "4":
      return "four";
      break;
    case "5":
      return "five";
      break;
    case "6":
      return "six";
      break;
    case "7":
      return "seven";
      break;
    case "8":
      return "eight";
      break;
    case "9":
      return "nine";
      break;
    case ".":
      return "dot";
      break;
    default:
      break;
  }
}

function operatorsToText(op) {
  switch (op) {
    case "+":
      return "addition";
      break;
    case "-":
      return "subtraction";
      break;
    case "*":
      return "multiplication";
      break;
    case "/":
      return "division";
      break;
    case "=":
      return "result";
      break;
    default:
      break;
  }
}

numbers.forEach((num) => {
  num.addEventListener("click", function () {
    numbersListener(num.id);
  });
});

operators.forEach((input) => {
  input.addEventListener("click", () => {
    operatorsListener(input.id);
  });
});

clear.addEventListener("click", () => {
  clearListener();
});

backspace.addEventListener("click", () => {
  backspaceListener();
});

const NUMBERS = "0132456789.";
const OPERATORS = "+-*/=";
document.addEventListener("keyup", (e) => {
  if (NUMBERS.includes(e.key)) {
    numbersListener(numbersToText(e.key));
  } else if (OPERATORS.includes(e.key)) {
    operatorsListener(operatorsToText(e.key));
  } else if (e.key === "Escape") {
    clearListener();
  } else if (e.key === "Backspace") {
    backspaceListener();
  } else if (e.key === "Enter") {
    operatorsListener("result");
  }
});
