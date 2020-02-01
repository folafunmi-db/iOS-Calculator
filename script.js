let prevEntry = 0;
let operator = null;
let currentEntry = 0;
let result = 0;

//Select elements needed on the screen
let display = document.querySelector("#display");
let buttons = document.querySelectorAll(".btn");
let operators = document.querySelectorAll(".operator");
updateScreen(result);

//Create a function that listens to key-presses
buttons.forEach(btn => {
  btn.addEventListener("click", function() {
    let btnClicked = this.innerText;
    display.value = btnClicked;
    console.log("You clicked: ", btnClicked);

    //Define the functionality for each button
    if (btnClicked === "AC") {
      currentEntry = 0;
      result = 0;
      removeActiveOperator();
    } else if (btnClicked === "+/-") {
      currentEntry *= -1;
      removeActiveOperator();
    } else if (btnClicked === ".") {
      currentEntry += ".";
    } else if (btnClicked === "x") {
      prevEntry = currentEntry;
      operator = "*";
      currentEntry = "";
    } else if (btnClicked === "/") {
      prevEntry = currentEntry;
      operator = "/";
      currentEntry = "";
    } else if (isNumber(btnClicked)) {
      if (currentEntry === 0 || currentEntry === result) {
        currentEntry = btnClicked;
      } else {
        currentEntry += btnClicked;
      }
    } else if (isOperator(btnClicked)) {
      btn.classList.toggle("active");
      prevEntry = currentEntry;
      operator = btnClicked;
      currentEntry = "";
    } else if (btnClicked === "%") {
      currentEntry /= 100;
    } else if (btnClicked === "=") {
      result = operate(prevEntry, operator, currentEntry);
      operator = null;
      currentEntry = result;
      removeActiveOperator();
    }
    updateScreen(currentEntry);
  });
});

//Create function to recognize numbers
function isNumber(value) {
  return !isNaN(value);
}

//Create function to recognize operators
function isOperator(value) {
  return value === "/" || value === "+" || value === "*" || value === "-";
}

//Create function to calculate the equation
function operate(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "/":
      return a / b;
    case "*":
      return a * b;
  }
}

//Create a function to display the results
function updateScreen(result) {
  let displayValue = result.toString();
  display.value = displayValue.substring(0, 6);
}

function removeActiveOperator() {
  operators.forEach(operator => {
    operator.classList.remove("active");
  });
}
