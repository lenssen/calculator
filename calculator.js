let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
  rerender();
}

function handleMath(value) {
  if (buffer === 0) {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushoperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
  console.log(runningTotal);
}

function flushoperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  }
  if (previousOperator === "-") {
    runningTotal -= intBuffer;
  }

  if (previousOperator === "X") {
    runningTotal *= intBuffer;
  }

  if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushoperation(parseInt(buffer));
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "+":
    case "-":
    case "X":
    case "÷":
      handleMath(symbol);
  }
  rerender();
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

function rerender() {
  screen.innerText = buffer;
}

init();
