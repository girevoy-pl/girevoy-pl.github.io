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
    repsSlider.value = currentExercise.defaultReps || 5; // Default to 5 reps if not set
    roundsSlider.value = currentExercise.defaultRounds;
  }

  // Update slider values on the page
  updateSliderValues();
}

// Exercise data with default time and rounds
const exercises = [
  { name: 'Push-ups', defaultTime: '02:00', defaultRounds: 2, defaultReps: 20 },
  { name: 'Jumping Jacks', defaultTime: '02:00', defaultRounds: 2, defaultReps: 33 },
  { name: 'Burpees', defaultTime: '02:00', defaultRounds: 2, defaultReps: 17 },
  { name: 'Snatch 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 23 },
  { name: 'Jerk 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 15 },
  { name: 'Jerk 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 13 },
  { name: 'LC 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 13 },
  { name: 'LC 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 12 },
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
  document.querySelector("label[for='reps-slider']").textContent = `Reps: ${repsSlider.value}`;
  document.querySelector("label[for='rounds-slider']").textContent = `Rounds: ${roundsSlider.value}`;
  document.querySelector("label[for='prepare-slider']").textContent = `Prepare Time: ${prepareSlider.value}`;
}

// Sliders event listeners
minuteSlider.addEventListener('input', updateSliderValues);
secondSlider.addEventListener('input', updateSliderValues);
repsSlider.addEventListener('input', updateSliderValues);
roundsSlider.addEventListener('input', updateSliderValues);
prepareSlider.addEventListener('input', updateSliderValues);

// Update initial values
updateSliderValues();

// Screen Wake Lock API Support Check
const isSupported = 'wakeLock' in navigator;
const wakeLockStatus = document.getElementById('is-supported');
const lockStatus = document.getElementById('is-locked');
const toggleLockButton = document.getElementById('toggle-lock');

// Initialize state for wake lock
let wakeLock = null;

// Display the support status
if (isSupported) {
  wakeLockStatus.innerText = 'Yes';
} else {
  wakeLockStatus.innerText = 'No';
  toggleLockButton.disabled = true;
}

// Function to request the screen wake lock
async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log("Screen wake lock acquired.");
  } catch (err) {
    console.error("Failed to acquire wake lock: ", err);
  }
}

// Function to release the screen wake lock
function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    console.log("Screen wake lock released.");
  }
}

// Automatically request the wake lock once the page is in use
document.addEventListener('DOMContentLoaded', () => {
  if (isSupported) {
    requestWakeLock();
  }
});

// Toggle button click event (for manual control)
toggleLockButton.addEventListener('click', () => {
  if (wakeLock) {
    releaseWakeLock();
  } else {
    requestWakeLock();
  }
});

// Event listener for "Start Exercise" button
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

  // Calculate the interval for the buzz sound based on reps and total round time
  const buzzInterval = totalRoundTime / reps;  // Calculate buzz interval based on the total round time and reps

  // Start preparation countdown
  const prepareInterval = setInterval(() => {
    updateTimerDisplay(remainingTime, currentRound, preparationBeepCount);

    if (remainingTime <= 0) {
      clearInterval(prepareInterval); // End preparation phase
      longBeep.play(); // Long beep for preparation completion
      startExerciseRounds(totalRoundTime, buzzInterval, rounds);
    } else {
      preparationBeepCount++;
      beep.play(); // Beep every second during preparation phase
    }

    remainingTime--;
  }, 1000);
});

// Function to start the rounds after preparation phase
function startExerciseRounds(totalRoundTime, buzzInterval, rounds) {
  currentRound = 1; // Start with the first round
  roundCounterElement = document.createElement('div');
  roundCounterElement.id = 'round-counter';
  document.body.appendChild(roundCounterElement);
  roundCounterElement.textContent = `Round: ${currentRound} of ${rounds}`;

  // Start round timer
  const roundInterval = setInterval(() => {
    updateTimerDisplay(totalRoundTime, currentRound, Math.floor(totalRoundTime / buzzInterval));

    if (totalRoundTime <= 0) {
      clearInterval(roundInterval); // End round
      currentRound++;

      if (currentRound <= rounds) {
        totalRoundTime = totalRoundTime; // Reset for the next round
        roundCounterElement.textContent = `Round: ${currentRound} of ${rounds}`;
      } else {
        clearInterval(roundInterval); // Finish after last round
        buzz.play(); // Final buzz sound at the end of all rounds
      }
    }

    totalRoundTime--;
  }, 1000);
}
