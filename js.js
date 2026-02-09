let num1;
let operator;
let num2;

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
  return a / b;
}

function operate(num1, operator, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      break;
  }
}

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers");

function updateDisplay(num) {
  switch (num) {
    case "nine":
      display.textContent += "9";
      console.log("nine");
      break;
    case "eight":
      display.textContent += "8";
      break;
    case "seven":
      display.textContent += "7";
      break;
    case "six":
      display.textContent += "6";
      break;
    case "five":
      display.textContent += "5";
      break;
    case "four":
      display.textContent += "4";
      break;
    case "three":
      display.textContent += "3";
      break;
    case "two":
      display.textContent += "2";
      break;
    case "one":
      display.textContent += "1";
      break;
    case "zero":
      display.textContent += "0";
      break;
    default:
      break;
  }
}

numbers.forEach((num) => {
  num.addEventListener("click", () => {
    updateDisplay(num.id);
  });
});
