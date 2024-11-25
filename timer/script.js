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
function updateTimerDisplay(time, round) {
  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60;
  timerDisplay.textContent = `${round} | ${minutesLeft < 10 ? '0' + minutesLeft : minutesLeft}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
}

// Initialize the exercise
let currentExercise = '';
let currentRound = 0;
let remainingTime = 0;
let preparationBeepCount = 0; // Track number of preparation beeps
let timerInterval;
let customSettingsActive = false;

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
  { name: 'Snatch 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 23 },
  { name: 'Jerk 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 15 },
  { name: 'LC 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 13 },
  { name: 'Jerk 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 14 },
  { name: 'LC 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 12 },
  { name: 'Push-ups', defaultTime: '02:00', defaultRounds: 3, defaultReps: 10 },
  { name: 'Jumping Jacks', defaultTime: '02:00', defaultRounds: 3, defaultReps: 10 },
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

// Event listener for "Keep Current Settings" button
document.getElementById('start-btn').addEventListener('click', function () {
  const exerciseMinute = parseInt(minuteSlider.value);
  const exerciseSecond = parseInt(secondSlider.value);
  const reps = parseInt(repsSlider.value);
  const rounds = parseInt(roundsSlider.value);
  const prepareTime = Math.max(parseInt(prepareSlider.value), 5); // Ensure minimum preparation time of 5s

  // Total time for one round in seconds (round time = minutes * 60 + seconds)
  const totalRoundTime = (exerciseMinute * 60) + exerciseSecond;

  // Prepare phase (countdown before rounds start)
  remainingTime = prepareTime;
  currentRound = 1; // Start with round 1

  // Calculate the exact interval in seconds between each buzz sound
  const buzzInterval = totalRoundTime / reps; 
  let nextBuzzTime = buzzInterval; // Track the exact timing for the next buzz

  // Total buzz count
  let totalBuzzCount = 0;

  // Stop any existing timer if button clicked
  clearInterval(timerInterval);

  let elapsedTime = 0; // Track the total elapsed time in the current round
  let isPreparationPhase = true; // Track whether we're in the preparation phase

  // Start the timer
  preparationBeepCount = 0; // Reset the beep count for preparation
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
      } else if (remainingTime === 0) {
        // End of preparation phase
        longBeep.play(); // Long beep to signal the start of the first round
        isPreparationPhase = false; // Switch to exercise phase
        remainingTime = totalRoundTime; // Set remaining time to the round duration
        elapsedTime = 0; // Reset elapsed time
        nextBuzzTime = buzzInterval; // Reset buzz time for the first round
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
        updateTimerDisplay(0, currentRound, totalBuzzCount); // Display 00:00 with total buzz count
      }
    }
  }, 1000); // Run every second
});

// Button to stop the current exercise and randomize a new one
document.getElementById('exercise-btn').addEventListener('click', function () {
  clearInterval(timerInterval);  // Stop the current timer
  randomizeExercise();  // Randomize a new exercise
});

// Update timer display function to include buzz count
function updateTimerDisplay(time, round, buzzCount = 0) {
  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60;
  timerDisplay.textContent = `${round} | ${minutesLeft < 10 ? '0' + minutesLeft : minutesLeft}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft} | ${buzzCount}`;
}
