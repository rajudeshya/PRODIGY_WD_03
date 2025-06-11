// Select DOM elements
const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

// Time tracking variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

/**
 * Format time from milliseconds to HH:MM:SS.MS
 */
function formatTime(ms) {
  const milliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor((totalSeconds / 60)) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  return (
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(milliseconds).padStart(3, '0')}`
  );
}

/**
 * Update the display every 10 milliseconds
 */
function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = formatTime(elapsedTime);
}

/**
 * Start the stopwatch
 */
function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime; // resume from last time
    timerInterval = setInterval(updateDisplay, 10); // update every 10ms
    isRunning = true;
    toggleButtons("start");
  }
}

/**
 * Pause the stopwatch
 */
function pauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    toggleButtons("pause");
  }
}

/**
 * Reset the stopwatch
 */
function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00.000";
  toggleButtons("reset");
}

/**
 * Toggle button states for accessibility and UX
 */
function toggleButtons(state) {
  if (state === "start") {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
  } else if (state === "pause") {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
  } else {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
  }
}

// Event listeners for buttons
startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);

// Initial state: reset and disable pause/reset
resetStopwatch();
