let num1;
let operator;
let num2;
let num1Complete = false;
let justGotResult = false;

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
  return result;
}

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const result = document.querySelector("#result");

function updateNumbers(input) {
  let num = "0";
  if (num1 !== undefined && num1Complete === false) {
    num = String(num1);
  }
  if (num1Complete === true && num2 !== undefined) {
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
  return Number(num);
}

numbers.forEach((num) => {
  num.addEventListener("click", () => {
    if (justGotResult) {
      num1 = undefined;
      num1Complete = false;
      justGotResult = false;
    }
    if (num1Complete === false) {
      num1 = Number(updateNumbers(num.id));
      display.textContent = num1;
    } else {
      num2 = Number(updateNumbers(num.id));
      display.textContent = num2;
    }

    console.log(`num1 ${num1}`);
    console.log(`num2 ${num2}`);
    console.log(`operator ${operator}`);
  });
});

operators.forEach((input) => {
  input.addEventListener("click", () => {
    if (operator !== undefined && num1 !== undefined && num2 !== undefined) {
      num1 = operate(num1, operator, num2);
      num1Complete = true;
      display.textContent = num1;
      num2 = undefined;
      justGotResult = true;
    }
    if (num1 !== undefined) {
      num1Complete = true;
      operator = input.id;
      justGotResult = false;
    }

    console.log(`num1 ${num1}`);
    console.log(`num2 ${num2}`);
    console.log(`operator ${operator}`);
  });
});

result.addEventListener("click", () => {
  if (operator !== undefined && num1 !== undefined && num2 !== undefined) {
    num1 = operate(num1, operator, num2);
    num1Complete = true;
    display.textContent = num1;
    num2 = undefined;
    operator = undefined;
    justGotResult = true;
  }

  console.log(`num1 ${num1}`);
  console.log(`num2 ${num2}`);
  console.log(`operator ${operator}`);
});

/*     console.log(`num1 ${num1}`);
    console.log(`num2 ${num2}`);
    console.log(`operator ${operator}`); */
