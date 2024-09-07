"use strict";

// del.2
// NB: spillet har en bug hvis man too low - to high om og om igen. Så stopper maskinen på 66 og udelukker 67 som mulighed, grundet Math.floor(). 

window.addEventListener("load", startApp);

// Stores the li elements for the game interface and guess log - type <li>
let cpuGuessLogArray;
// stores the latest cpu guess - type int
let cpuGuess;
// stores the latest user input  type int (-1, 1 or 0)
let guessFeedback;
// stores the latest guess set as "too low" - type int
let minGuessLimit;
// stores the latest guess set as "too high" - type int
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

// sets - resets all the variables
function liveGame() {
  hideStartGameBtn();
  showGameArea();
  // sets the log array as an empty array
  cpuGuessLogArray = [];
  // set the guess feed back to 3
  guessFeedback = 3;
  clearCpuGuessLog();
  findHalfOfOptions();
}

function findHalfOfOptions() {
  console.log("step 3 - Make a new guess");

  if (guessFeedback === -1) {
    console.log("guess too low");
    minGuessLimit = cpuGuess;
  } else if (guessFeedback === 1) {
    console.log("guess too to high");
    maxGuessLimit = cpuGuess;
  } else {
    console.log("First guess");
    minGuessLimit = 0;
    maxGuessLimit = 100;
  }

  if (minGuessLimit === maxGuessLimit - 1 || maxGuessLimit <= minGuessLimit) {
    inconsiceInputDetected();
  } else if (maxGuessLimit > minGuessLimit) {
    cpuGuess = returnMean(minGuessLimit, maxGuessLimit);
    displayCpuGuess();
  }
}

function inconsiceInputDetected() {
  gameOverByDeduction();
}

// Finds the mean
function returnMean(min, max) {
  return Math.floor((max - min) / 2 + min);
}

// Displays the current CPU guess
function displayCpuGuess() {
  console.log("step 4 - display guess");
  console.log(
    "Max: ",
    maxGuessLimit,
    ". Guess: ",
    cpuGuess,
    ". Min: ",
    minGuessLimit
  );

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
  lowButton.textContent = "Too low";
  lowButton.addEventListener("click", guessTooLow);

  const correctButton = document.createElement("button");
  correctButton.textContent = "Corret!";
  correctButton.addEventListener("click", guessCorrect);

  const highButton = document.createElement("button");
  highButton.textContent = "Too high";
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
  //min-guess-limit had 1 added to raise the floor
  minGuessLimit = cpuGuess + 1;
  receiveFeedbackInput();
}

function guessTooHigh() {
  console.log("step 7 - highGuessClicked");
  guessFeedback = 1;
  maxGuessLimit = cpuGuess;
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
      gameOverBySuccess();
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
  findHalfOfOptions();
}

function gameOverByDeduction() {
  console.log("step 14 c - guess again");
  const lastLogItem = document.querySelector("#cpu-guesses li:last-child");
  lastLogItem.innerHTML = `I got it! Your number must be ${cpuGuess}.`;
}

function gameOverBySuccess() {
  console.log("step 14 b - game over!");

  // Insert the game over message as last child - instead of the buttons
  const lastLogItem = document.querySelector("#cpu-guesses li:last-child");
  lastLogItem.innerHTML = "Hurra - I guessed it!";
}
