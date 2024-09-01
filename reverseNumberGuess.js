"use strict";

window.addEventListener("load", startApp);

// Variables
let cpuGuessLogArray;

let cpuGuess;

let guessFeedback;

let minGuessLimit;

let maxGuessLimit;

function startApp() {
  console.log("step 1 - StartApp");
  showStartGameBtn();
  addStartBtnEventListener();
}

// Shows or hides elements
function hideGameArea() {
  document.querySelector("#active-game-section").classList.add("hidden");
}

function showGameArea() {
  document.querySelector("#active-game-section").classList.remove("hidden");
}

function hideStartGameBtn() {
  document.querySelector("#start-game-btn").classList.add("hidden");
}

function showStartGameBtn() {
  document.querySelector("#start-game-btn").classList.remove("hidden");
}

function addStartBtnEventListener() {
  document
    .querySelector("#start-game-btn")
    .addEventListener("click", startGame);
}

// Starts a new game when start-btn is clicked
function startGame() {
  console.log("step 2 - startGameClicked");
  liveGame();
}

function liveGame() {
  hideStartGameBtn();
  showGameArea();
  cpuGuessLogArray = [];
  guessFeedback = 3;
  cpuGuess = 24;
  clearCpuGuessLog();
  calculateCpuGuess();
}

function calculateCpuGuess() {
  console.log("step 3 - Make a new guess");

  if (guessFeedback == 3) {
    console.log("First guess");
    minGuessLimit = 0;
    maxGuessLimit = 100;
  } else if (guessFeedback === -1) {
    console.log("guess too low");
    minGuessLimit = cpuGuess + 1;
  } else if (guessFeedback === 1) {
    console.log("guess too to high");
    maxGuessLimit = cpuGuess - 1;
  }

  if (maxGuessLimit > minGuessLimit) {
    cpuGuess = generateNumberBetween(minGuessLimit, maxGuessLimit);
    displayCpuGuess();
  } else {
    alert(
      `Something went wrong! Your number is minimum ${minGuessLimit} and maximum ${maxGuessLimit}: please restart!`
    );
  }
}

function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Displays the current CPU guess
function displayCpuGuess() {
  console.log("step 4 - display guess");
  const logItem = document.createElement("li");
  logItem.textContent = `I'm guessing ${cpuGuess}`;
  cpuGuessLogArray.push(logItem);
  displayLogWithButtons(logItem);
}

function clearCpuGuessLog() {
  document.getElementById("cpu-guesses").innerHTML = "";
}

function displayLogWithButtons(logItem) {
  console.log("step 6 - display log");

  // loops on the log array
  loopLogs();

  // Create the 3 buttons
  const lowButton = document.createElement("button");
  lowButton.textContent = "For lavt";
  lowButton.addEventListener("click", guessTooLow);

  const correctButton = document.createElement("button");
  correctButton.textContent = "Korrekt!";
  correctButton.addEventListener("click", guessCorrect);

  const highButton = document.createElement("button");
  highButton.textContent = "For højt";
  highButton.addEventListener("click", guessTooHigh);

  // Appends the buttons as the las element in the log array
  logItem.appendChild(lowButton);
  logItem.appendChild(correctButton);
  logItem.appendChild(highButton);

  // Append the enite log li-item to the log array
  document.querySelector("#cpu-guesses").appendChild(logItem);
}

function loopLogs() {
  console.log("loop on log array");
  clearCpuGuessLog();

  // Re-display all items in the log array
  for (const logItem of cpuGuessLogArray) {
    document.querySelector("#cpu-guesses").appendChild(logItem);
  }
}

// the functions that handles the button inputs
function guessTooLow() {
  console.log("step 7 - loowGuessClicked");
  guessFeedback = -1;
  minGuessLimit = cpuGuess + 1;
  receiveFeedbackInput();
}

function guessTooHigh() {
  console.log("step 7 - highGuessClicked");
  guessFeedback = 1;
  maxGuessLimit = cpuGuess - 1;
  receiveFeedbackInput();
}

function guessCorrect() {
  console.log("step 7 - guessCorrectClicked");
  guessFeedback = 0;
  receiveFeedbackInput();
}

function receiveFeedbackInput() {
  console.log("step 8 - feedback is - ", guessFeedback);
  // removes the last element in the cpu log array
  removeElement();

  setGuessFeedbackMessage();
}

function removeElement() {
  cpuGuessLogArray.pop();
  console.log(cpuGuessLogArray);
}

function setGuessFeedbackMessage() {
  console.log("Step 9 - Set guess feedback!");

  let guessFeedbackMessage = "";

  switch (guessFeedback) {
    case -1:
      guessFeedbackMessage = "too low";
      displayCpuGuessLog(guessFeedbackMessage);
      break;
    case 1:
      guessFeedbackMessage = "too high";
      displayCpuGuessLog(guessFeedbackMessage);
      break;
    case 0:
      guessFeedbackMessage = "correct";
      gameOver();
      break;
  }
}

function displayCpuGuessLog(message) {
  console.log("step 10 - displayLog");
  const logHTML = `My guess is ${cpuGuess} - it was ${message}`;
  addFeedbackToLog(logHTML);
}

function addFeedbackToLog(newHTML) {
  console.log("step 12 - add current feedback to log");
  const logItem = document.createElement("li");
  logItem.textContent = newHTML;
  cpuGuessLogArray.push(logItem);
  displayLogWithoutButtons();
}

function displayLogWithoutButtons() {
  console.log("step 13 - display log");
  loopLogs();
  // Redo the process from Calculate CPU guess
  guessAgain();
}

function guessAgain() {
  console.log("step 14 a - guess again");
  calculateCpuGuess();
}

function gameOver() {
  console.log("step 14 b - game over!");

  // Insert the game over message as last child - instead of the buttons
  const lastLogItem = document.querySelector("#cpu-guesses li:last-child");
  lastLogItem.innerHTML = "Hurra - I guessed it!"; 
}
