// Beep sound, long beep sound, and buzz sound using Howler.js
const beep = new Howl({
  src: ['beep-sound.mp3'],
  preload: true
}); // Regular beep sound
const longBeep = new Howl({
  src: ['long-beep-sound.mp3'],
  preload: true
}); // Long beep sound
const buzz = new Howl({
  src: ['buzz-sound.mp3'],
  preload: true
}); // Buzz sound for reps

// Slider elements for exercise time, rounds, reps, and preparation time
const minuteSlider = document.getElementById('minute-slider');
const secondSlider = document.getElementById('second-slider');
const repsSlider = document.getElementById('reps-slider');
const roundsSlider = document.getElementById('rounds-slider');
const prepareSlider = document.getElementById('prepare-slider');

// Timer and round counter elements
const timerDisplay = document.getElementById('timer');
let roundCounterElement;

// Function to update the timer display
function updateTimerDisplay(time, round, buzzCount = 0) {
  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60;
  timerDisplay.textContent = `${round} | ${minutesLeft < 10 ? '0' + minutesLeft : minutesLeft}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft} | ${buzzCount}`;
}

// Initialize the exercise
let currentExercise = '';
let currentRound = 0;
let remainingTime = 0;
let preparationBeepCount = 0; // Track number of preparation beeps
let timerInterval;
let customSettingsActive = false; // Track if "Keep Current Settings" is active

// Add event listener to the "Keep Current Settings" button
const keepSettingsBtn = document.getElementById('keep-settings-btn');

keepSettingsBtn.addEventListener('click', () => {
  // Toggle the custom settings active state
  customSettingsActive = !customSettingsActive;

  if (customSettingsActive) {
    keepSettingsBtn.textContent = "Settings Locked";
    keepSettingsBtn.classList.add('active'); // Optionally style the button when active
  } else {
    keepSettingsBtn.textContent = "Keep Current Settings";
    keepSettingsBtn.classList.remove('active'); // Remove the active style
  }
});

// Function to randomize the exercise and set the corresponding time and rounds
function randomizeExercise() {
  currentExercise = getRandomExercise();
  document.getElementById('exercise-btn').textContent = currentExercise.name; // Update button text

  // Update sliders only if "Keep Current Settings" is not active
  if (!customSettingsActive) {
    const [defaultMinute, defaultSecond] = currentExercise.defaultTime.split(':');
    minuteSlider.value = defaultMinute;
    secondSlider.value = defaultSecond;
    Slider.value = currentExercise.default || 5; // Default to 5  if not set
    roundsSlider.value = currentExercise.defaultRounds;
  }

  // Update slider values on the page
  updateSliderValues();
}

// Exercise data with default time and rounds
const exercises = [
  { name: 'Push-ups', defaultTime: '02:00', defaultRounds: 2, default: 20 },
  { name: 'Jumping Jacks', defaultTime: '02:00', defaultRounds: 2, default: 33 },
  { name: 'Burpees', defaultTime: '02:00', defaultRounds: 2, default: 17 },
  { name: 'Snatch 1KB', defaultTime: '03:00', defaultRounds: 4, default: 23 },
  { name: 'Jerk 1KB', defaultTime: '03:00', defaultRounds: 4, default: 15 },
  { name: 'Jerk 2KB', defaultTime: '03:00', defaultRounds: 3, default: 13 },
  { name: 'LC 1KB', defaultTime: '03:00', defaultRounds: 4, default: 13 },
  { name: 'LC 2KB', defaultTime: '03:00', defaultRounds: 3, default: 12 },
  { name: 'Clean 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 16 },
  { name: 'Clean 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 14 },
  { name: 'Clean&press 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 13 },
  { name: 'Clean&press 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 12 },
  { name: 'Push press 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 15 },
  { name: 'Push press 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 12 }
];

// Function to get a random exercise from the list
let lastExerciseIndex = -1;
function getRandomExercise() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * exercises.length);
  } while (randomIndex === lastExerciseIndex); // Prevent repeating the previous exercise
  lastExerciseIndex = randomIndex;
  return exercises[randomIndex];
}

// Randomize exercise on page load (no need for button press)
window.onload = function () {
  randomizeExercise(); // Automatically select and load an exercise when the page loads
};

// Function to update slider text with current values
function updateSliderValues() {
  document.querySelector("label[for='minute-slider']").textContent = `Minutes: ${minuteSlider.value}`;
  document.querySelector("label[for='second-slider']").textContent = `Seconds: ${secondSlider.value}`;
  document.querySelector("label[for='reps-slider']").textContent = `RPM: ${repsSlider.value}`;
  document.querySelector("label[for='rounds-slider']").textContent = `Rounds: ${roundsSlider.value}`;
  document.querySelector("label[for='prepare-slider']").textContent = `Preparation Time: ${prepareSlider.value}`;
}

// Sliders event listeners
minuteSlider.addEventListener('input', updateSliderValues);
secondSlider.addEventListener('input', updateSliderValues);
repsSlider.addEventListener('input', updateSliderValues);
roundsSlider.addEventListener('input', updateSliderValues);
prepareSlider.addEventListener('input', updateSliderValues);

// Update initial values
updateSliderValues();

// Screen Wake Lock API
let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log("Screen wake lock acquired.");
  } catch (err) {
    console.error("Failed to acquire wake lock: ", err);
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    console.log("Screen wake lock released.");
  }
}

// Event listener for "Keep Current Settings" button
document.getElementById('start-btn').addEventListener('click', function () {
  const exerciseMinute = parseInt(minuteSlider.value);
  const exerciseSecond = parseInt(secondSlider.value);
  const reps = parseInt(repsSlider.value);
  const rounds = parseInt(roundsSlider.value);
  const prepareTime = Math.max(parseInt(prepareSlider.value), 5); // Ensure minimum preparation time of 5s

  // Total time for one round in seconds
  let totalRoundTime = exerciseMinute * 60 + exerciseSecond;

  // Handle case where minutes = 0, only seconds slider matters
  if (exerciseMinute === 0) {
    totalRoundTime = exerciseSecond;  // Only use seconds
  }

  // Prepare phase (countdown before rounds start)
  remainingTime = prepareTime;
  currentRound = 1; // Start with round 1

  // Calculate the total exercise time (in seconds)
  let totalExerciseTime = exerciseMinute * 60 + exerciseSecond;

  // Calculate the interval for the buzz sound based on 60 / amount of reps
  const buzzInterval = 60 / reps;  // Calculate buzz interval based on 60 seconds divided by number of reps
  let nextBuzzTime = buzzInterval; // Set initial buzz time
  let totalBuzzCount = 0;

  // Stop any existing timer if button clicked
  clearInterval(timerInterval);

  let elapsedTime = 0; // Track the total elapsed time in the current round
  let isPreparationPhase = true; // Track whether we're in the preparation phase

  // Start the timer
  preparationBeepCount = 0; // Reset the beep count for preparation

  // Request the wake lock when the timer starts
  requestWakeLock();

  timerInterval = setInterval(() => {
    // Update timer display with total buzz count
    updateTimerDisplay(remainingTime, currentRound, totalBuzzCount);

    if (isPreparationPhase) {
      // Handle preparation countdown
      if (remainingTime > 0) {
        // Beep during preparation phase (3s, 2s, 1s remaining)
        if (remainingTime <= 3 && preparationBeepCount < 3) {
          beep.play();
          preparationBeepCount++;
        }
        remainingTime--;
      } else {
        // Switch to exercise phase after preparation
        isPreparationPhase = false;
        remainingTime = totalRoundTime; // Set round time for exercise phase
        elapsedTime = 0; // Reset elapsed time
        nextBuzzTime = buzzInterval; // Reset buzz interval for round
        
        // Play the long beep sound at the start of the first round
        longBeep.play();
      }
    } else {
      // Exercise phase
      if (remainingTime > 0) {
        elapsedTime += 1; // Increase elapsed time by 1 second
        if (elapsedTime >= nextBuzzTime) {
          buzz.play(); // Play buzz sound
          totalBuzzCount++; // Increment the total buzz count
          nextBuzzTime += buzzInterval; // Schedule the next buzz
        }
        remainingTime--;
      } else if (remainingTime === 0 && currentRound < rounds) {
        // End of the current round (not the last one)
        beep.play(); // Play beep after this round
        currentRound++;
        remainingTime = totalRoundTime; // Reset time for next round
        elapsedTime = 0; // Reset elapsed time
        nextBuzzTime = buzzInterval; // Reset buzz time for the new round
      } else if (remainingTime === 0 && currentRound === rounds) {
        // Last round finished
        longBeep.play(); // Long beep to indicate the end of the workout
        clearInterval(timerInterval); // Stop the timer

        // Release the wake lock when the timer ends
        releaseWakeLock();

        updateTimerDisplay(0, currentRound, totalBuzzCount); // Display 00:00 with total buzz count
      }
    }
  }, 1000); // Run every second

  // Prevent iPhone sleep by simulating touch events
  setInterval(simulateTouchEvent, 3000); // Simulate a touch event every 3 seconds
});

// Function to simulate a touch event to prevent the screen from going to sleep
function simulateTouchEvent() {
  const touchEvent = new Event('touchstart', { bubbles: true });
  document.dispatchEvent(touchEvent);
}

// Button to stop the current exercise and randomize a new one
document.getElementById('exercise-btn').addEventListener('click', function () {
  clearInterval(timerInterval);  // Stop the current timer
  randomizeExercise();  // Randomize a new exercise
});
