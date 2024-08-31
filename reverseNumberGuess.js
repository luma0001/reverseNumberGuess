"use strict";

window.addEventListener("load", startApp);

// Global variable that stores the cpu-guess - type is a whole number
let cpuGuess;

// Variable that stores the user feedback
let guessFeedback;

function startApp() {
  console.log("step 1 - StartApp");
  hideGameArea();
  showStartGameBtn();
  addEevntlisteners();
}

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



// adds button event listeners to buttons
function addEevntlisteners() {
  document
    .querySelector("#start-game-btn")
    .addEventListener("click", startGame);
  document
    .getElementById("guess-too-low-btn")
    .addEventListener("click", guessTooLow);
  document
    .getElementById("guess-correct-btn")
    .addEventListener("click", guessTooHigh);
  document
    .getElementById("guess-too-high-btn")
    .addEventListener("click", guessCorrect);
}

// function removeEvenlisteners() {
//   document
//     .getElementById("start-game-btn")
//     .removeEvenlistener("click", startGame);
//   document
//     .getElementById("guess-too-low-btn")
//     .removeEvenlistener("click", guessTooLow);
//   document
//     .getElementById("guess-correct-btn")
//     .removeEvenlistener("click", guessTooHigh);
//   document
//     .getElementById("guess-too-high-btn")
//     .removeEvenlistener("click", guessCorrect);
// }

// Starts a new game when start-btn is clicked
function startGame() {
  console.log("step 2 - startGameClicked");
  //document.querySelector("#start-screen-modal").showModal();
  liveGame();
}

// Sets the first guess
function liveGame() {
  hideStartGameBtn();
  showGameArea();
  cpuGuess = 24;
  // clears last games log list
  clearCpuGuessLog();
  calculateCpuGuess();
}

// Input if the guess too low
function guessTooLow() {
  console.log("step 5 - loowGuessClicked");
  guessFeedback = -1;
  recieveFeedbackInput();
}

// Input if the guess is too high
function guessTooHigh() {
  console.log("step 5 - highGuessClicked");
  guessFeedback = 1;
  recieveFeedbackInput();
}

// Input if the guess is correct
function guessCorrect() {
  console.log("step 5 - guessCorrectClicked");
  guessFeedback = 0;
  recieveFeedbackInput();
}

function recieveFeedbackInput() {
  console.log("step 6 - feedback is - ", guessFeedback);
  setGuessFeedbackMessage();
  calculateCpuGuess();
}

// What happens if there is a problem...
// CPU makes a guess.
// Input is given...
// Last guess and input is displayed
// CPU guess counter is increased
// ... and that is displayed
// New guess is calculated - last guess/ too high or too low

// Calculates a new CPU guess
function calculateCpuGuess() {
  console.log("step 3 - Make a new guess");
  cpuGuess = cpuGuess + 1;
  const currentCpuGuess = cpuGuess;

  displayCpuGuess(currentCpuGuess);
}

// Displays the current cpu - guess
function displayCpuGuess(calculateCpuGuess) {
  console.log("step 4 - display guess");
  const currentgGuessDisplay = document.querySelector("#current-cpu-guess");
  currentgGuessDisplay.innerHTML = `My nex guess is ${calculateCpuGuess} `;
}

function setGuessFeedbackMessage() {
  console.log("Step 7 - Set guess feedback!");

  // switch that sets the feedback message
  let guessFeedbackMessage = "";

  switch (guessFeedback) {
    case -1:
      guessFeedbackMessage = "too low";
      displayCpuGuessLog("too low");
      break;
    case 1:
      guessFeedbackMessage = "too high";
      displayCpuGuessLog("too low");
      break;
    case 0:
      guessFeedbackMessage = "correct";
      displayCpuGuessLog("too low");
      break;
  }
}

// Updates the cpu guess log
function displayCpuGuessLog(guessFeedbackMessage) {
  console.log(
    "step 8 - display guess log ",
    cpuGuess,
    " and ",
    guessFeedbackMessage
  );

  // List for previous guesses - stings
  const cpuGugessLogArray = [];
  const newCpuGuessLog = `I'm guessing ${cpuGuess} - that is ${guessFeedbackMessage}`;
  cpuGugessLogArray.push(newCpuGuessLog);

  console.log("cpu array", cpuGugessLogArray);

  // Log the log array and display the html
  for (const log of cpuGugessLogArray) {
    const logElementHtml = `<li>${newCpuGuessLog}</li>`;

    document
      .querySelector("#cpu-guesses")
      .insertAdjacentHTML("beforeend", logElementHtml);
  }
}

function clearCpuGuessLog() {
  document.getElementById("cpu-guesses").innerHTML = "";
}
