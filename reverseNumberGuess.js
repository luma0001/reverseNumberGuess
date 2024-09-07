"use strict";

// del.2

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
// Stores the amounts of rounds
let roundsCounter;

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
  // set the guess feed back to 3 - the default option
  guessFeedback = 3;
  // set the rounds-counter at 0
  roundsCounter = 0;
  clearCpuGuessLog();
  generateCpuGuess();
}

//
function generateCpuGuess() {
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

  // Checks if the min - max guesses face a paradox
  if (minGuessLimit === maxGuessLimit - 1 || maxGuessLimit <= minGuessLimit) {
    gameOverByDeduction();
    // Continues the game if max is still greate than min
  } else if (maxGuessLimit > minGuessLimit) {
    incrementRounds();
    cpuGuess = returnMean(minGuessLimit, maxGuessLimit);
    displayCpuGuess();
  }
}

// Increase the rounds-counter by 1
function incrementRounds() {
  roundsCounter = roundsCounter + 1;
}

// Returns the mean
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

// loops the array of guess logs
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
  // removes the last element in the cpu log array - the ones with buttons
  removeElement();

  setGuessFeedbackMessage();
}

// Removes the former element in the guess array
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

// Display the CPU guess and user input as text
function displayLogWithoutButtons() {
  console.log("step 13 - display log");
  loopLogs();
  // Redo the process from Calculate CPU guess
  guessAgain();
}

// Repeats the process from generateCpuGuess "step 3"
function guessAgain() {
  console.log("step 14 a - guess again");
  generateCpuGuess();
}

// Stops the game and adds a message if the answer is found by deduction
function gameOverByDeduction() {
  console.log("step 14 c - guess again");

  // Gets a win message to concatenate for game over reply
  let winMessage = winMessageByRounds();

  // Inserts the message as last element - instead of the buttons
  const lastLogItem = document.querySelector("#cpu-guesses li:last-child");
  lastLogItem.innerHTML = `I got it! Your number must be ${cpuGuess}. ${winMessage}`;
}

// Stops the game and adds a message if the user input was: "correct!"
function gameOverBySuccess() {
  console.log("step 14 b - game over!");

  // Gets a win message to concatenate for game over reply
  let winMessage = winMessageByRounds();

  // Insert the game over message as last child - instead of the buttons
  const lastLogItem = document.querySelector("#cpu-guesses li:last-child");
  lastLogItem.innerHTML = `Hurra - I guessed it! ${winMessage}`;
}

// Retun a win message
function winMessageByRounds() {
  if (roundsCounter > 5) {
    return ` Nice, but I can do better than ${roundsCounter} rounds`;
  } else if (roundsCounter > 3) {
    return `In just ${roundsCounter} rounds, I did alright don't you think `;
  } else if (roundsCounter > 1) {
    return ` Wooow I'm the best! ${roundsCounter} rounds baby`;
  } else if (roundsCounter === 1) {
    return `That was too easy, pick a better number next time`;
  }
}
