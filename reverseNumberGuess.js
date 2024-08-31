window.addEventListener("load", startApp);


// Global variable that stores the cpu-guess - type is a whole number
let cpuGuess;

function startApp() {
  console.log("Gæt nummer 1");

  addEentlisteners();
}

function addEentlisteners() {
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
  console.log("startGameClicked");
}

// Sets guess too low
function guessTooLow() {
  console.log("loowGuessClicked");
}

// Set guess is too high
function guessTooHigh() {
  console.log("highGuessClicked");
}

// Set guess is correct
function guessCorrect() {
  console.log("guessCorrectClicked");
}

// CPU makes a guess.
// Input is given...
// Last guess and input is displayed
// CPU guess counter is increased
// ... and that is displayed
// New guess is calculated - last guess/ too high or too low

function calculateCpuGuess() {}

function displayCpuGuess() {}

function displayCpuGuessLog() {}

// What happens if there is a problem...
