let num1;
let operator;
let num2;
let justPressedOperator = false;
let justPressedResult = false;

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
  return Math.round((a / b) * 100) / 100;
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
  console.log(result);
  return result;
}

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const result = document.querySelector("#result");

function updateNumbers(input) {
  let num = "0";
  if (num1 !== undefined && justPressedOperator === false) {
    num = String(num1);
  }
  if (justPressedOperator === true && num2 !== undefined) {
    num = String(num2);
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
    default:
      break;
  }
  console.log(num);
  return Number(num);
}

numbers.forEach((num) => {
  num.addEventListener("click", () => {
    if (justPressedResult === true) {
      num1 = undefined;
      justPressedResult = false;
    }
    if (justPressedOperator === false) {
      num1 = Number(updateNumbers(num.id));
      display.textContent = num1;
    } else {
      num2 = Number(updateNumbers(num.id));
      display.textContent = num2;
    }
    justPressedOperator = false;
    console.log(`num1 ${num1}`);
    console.log(`num2 ${num2}`);
    console.log(`operator ${operator}`);
  });
});

operators.forEach((input) => {
  input.addEventListener("click", () => {
    justPressedResult = false;
    if (operator !== undefined && num1 !== undefined && num2 !== undefined) {
      num1 = operate(num1, operator, num2);
      display.textContent = num1;
      num2 = undefined;
    }
    if (num1 !== undefined) {
      operator = input.id;
      justPressedOperator = true;
      console.log(`num1 ${num1}`);
      console.log(`num2 ${num2}`);
      console.log(`operator ${operator}`);
    }
  });
});

result.addEventListener("click", () => {
  console.log(`num1 ${num1}`);
  console.log(`num2 ${num2}`);
  console.log(`operator ${operator}`);
  display.textContent = operate(num1, operator, num2);
  num1 = display.textContent;
  operator = undefined;
  num2 = undefined;
  justPressedResult = true;
});
