// -----------------------------
// Sound Setup (Original)
// -----------------------------
const beep = new Howl({
  src: ['beep-sound.mp3'],
  preload: true
});
const longBeep = new Howl({
  src: ['long-beep-sound.mp3'],
  preload: true
});
const buzz = new Howl({
  src: ['buzz-sound.mp3'],
  preload: true
});

// -----------------------------
// DOM Elements (Original)
// -----------------------------
const minuteSlider = document.getElementById('minute-slider');
const secondSlider = document.getElementById('second-slider');
const repsSlider = document.getElementById('reps-slider');
const roundsSlider = document.getElementById('rounds-slider');
const prepareSlider = document.getElementById('prepare-slider');
const timerDisplay = document.getElementById('timer');
const keepSettingsBtn = document.getElementById('keep-settings-btn');

// -----------------------------
// Global Variables (Original)
// -----------------------------
let currentExercise = '';
let currentRound = 0;
let remainingTime = 0;
let preparationBeepCount = 0;
let timerInterval;
let customSettingsActive = false;

// -----------------------------
// Update Timer Display (Original)
// -----------------------------
function updateTimerDisplay(time, round, buzzCount = 0) {
  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60;
  timerDisplay.textContent = `${round} | ${minutesLeft < 10 ? '0' + minutesLeft : minutesLeft}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft} | ${buzzCount}`;
}

// -----------------------------
// Keep Settings Button Logic
// -----------------------------
keepSettingsBtn.addEventListener('click', () => {
  customSettingsActive = !customSettingsActive;
  if (customSettingsActive) {
    keepSettingsBtn.textContent = "Settings Locked";
    keepSettingsBtn.classList.add('active');
  } else {
    keepSettingsBtn.textContent = "Keep Current Settings";
    keepSettingsBtn.classList.remove('active');
  }
});

// -----------------------------
// Exercise List (Original)
// -----------------------------
const exercises = [
  { name: 'Jumping Jacks', defaultTime: '02:00', defaultRounds: 2, defaultReps: 33 },
  { name: 'Burpees', defaultTime: '02:00', defaultRounds: 2, defaultReps: 16 },
  { name: 'Push-ups', defaultTime: '02:00', defaultRounds: 2, defaultReps: 16 },
  { name: 'Clean 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 17 },
  { name: 'Clean 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 12 },
  { name: 'Clean&press 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 13 },
  { name: 'Clean&press 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 11 },
  { name: 'LC 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 13 },
  { name: 'LC 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 11 },
  { name: 'Jerk 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 17 },
  { name: 'Jerk 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 12 },
  { name: 'Push press 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 17 },
  { name: 'Push press 2KB', defaultTime: '03:00', defaultRounds: 3, defaultReps: 12 },
  { name: 'Snatch 1KB', defaultTime: '03:00', defaultRounds: 4, defaultReps: 21 }
];

// Prevent repeating same exercise
let lastExerciseIndex = -1;
function getRandomExercise() {
  let i;
  do { i = Math.floor(Math.random() * exercises.length); }
  while (i === lastExerciseIndex);
  lastExerciseIndex = i;
  return exercises[i];
}

function randomizeExercise() {
  currentExercise = getRandomExercise();
  document.getElementById('exercise-btn').textContent = currentExercise.name;

  if (!customSettingsActive) {
    const [m, s] = currentExercise.defaultTime.split(':');
    minuteSlider.value = m;
    secondSlider.value = s;
    repsSlider.value = currentExercise.defaultReps || 5;
    roundsSlider.value = currentExercise.defaultRounds;
  }
  updateSliderLabels();
}

window.onload = randomizeExercise;

// -----------------------------
// Slider Update (Original)
// -----------------------------
function updateSliderLabels() {
  document.querySelector("label[for='minute-slider']").textContent = `Minutes: ${minuteSlider.value}`;
  document.querySelector("label[for='second-slider']").textContent = `Seconds: ${secondSlider.value}`;
  document.querySelector("label[for='reps-slider']").textContent = `RPM: ${repsSlider.value}`;
  document.querySelector("label[for='rounds-slider']").textContent = `Rounds: ${roundsSlider.value}`;
  document.querySelector("label[for='prepare-slider']").textContent = `Preparation Time: ${prepareSlider.value}`;
}
[minuteSlider, secondSlider, repsSlider, roundsSlider, prepareSlider].forEach(slider =>
  slider.addEventListener('input', updateSliderLabels)
);
updateSliderLabels();

// -----------------------------
// Wake Lock + Touch Fallback
// -----------------------------
let wakeLock = null;
let preventSleepInterval = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', async () => {
      console.log('Wake Lock was released, attempting to reacquire...');
      try { wakeLock = await navigator.wakeLock.request('screen'); }
      catch (err) { console.error('Reacquire failed:', err); }
    });
  } catch (err) {
    console.error('Wake Lock request failed:', err);
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}

function startPreventSleep() {
  if (!preventSleepInterval) {
    preventSleepInterval = setInterval(simulateTouchEvent, 3000);
  }
}
function stopPreventSleep() {
  if (preventSleepInterval) {
    clearInterval(preventSleepInterval);
    preventSleepInterval = null;
  }
  releaseWakeLock();
}

function simulateTouchEvent() {
  const touchEvent = new Event('touchstart', { bubbles: true });
  document.dispatchEvent(touchEvent);
}

// -----------------------------
// Start Button Logic (Original + Wake Lock Integration)
// -----------------------------
document.getElementById('start-btn').addEventListener('click', function () {
  const exerciseMinute = parseInt(minuteSlider.value);
  const exerciseSecond = parseInt(secondSlider.value);
  const reps = parseInt(repsSlider.value);
  const rounds = parseInt(roundsSlider.value);
  const prepareTime = Math.max(parseInt(prepareSlider.value), 5);

  let totalRoundTime = exerciseMinute * 60 + exerciseSecond;
  if (!exerciseMinute) totalRoundTime = exerciseSecond;

  remainingTime = prepareTime;
  currentRound = 1;
  let totalBuzzCount = 0;
  let elapsedTime = 0;
  let isPreparation = true;
  let buzzInterval = 60 / reps;
  let nextBuzzTime = buzzInterval;

  clearInterval(timerInterval);
  startPreventSleep();
  requestWakeLock();
  preparationBeepCount = 0;

  timerInterval = setInterval(() => {
    updateTimerDisplay(remainingTime, currentRound, totalBuzzCount);

    if (isPreparation) {
      if (remainingTime > 0) {
        if (remainingTime <= 3 && preparationBeepCount < 3) {
          beep.play();
          preparationBeepCount++;
        }
        remainingTime--;
      } else {
        isPreparation = false;
        remainingTime = totalRoundTime;
        elapsedTime = 0;
        nextBuzzTime = buzzInterval;
        longBeep.play();
      }
    } else {
      if (remainingTime > 0) {
        elapsedTime++;
        if (elapsedTime >= nextBuzzTime) {
          buzz.play();
          totalBuzzCount++;
          nextBuzzTime += buzzInterval;
        }
        remainingTime--;
      } 
      else if (remainingTime === 0 && currentRound < rounds) {
        beep.play();
        currentRound++;
        remainingTime = totalRoundTime;
        elapsedTime = 0;
        nextBuzzTime = buzzInterval;
      } 
      else if (remainingTime === 0 && currentRound === rounds) {
        longBeep.play();
        clearInterval(timerInterval);
        stopPreventSleep();
        updateTimerDisplay(0, currentRound, totalBuzzCount);
      }
    }
  }, 1000);
});

// Update slider fill color dynamically
document.querySelectorAll('.slider').forEach(slider => {
  const updateFill = () => {
    const val = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--value', `${val}%`);
  };
  slider.addEventListener('input', updateFill);
  updateFill();
});

// -----------------------------
// Exercise Change Button
// -----------------------------
document.getElementById('exercise-btn').addEventListener('click', function () {
  clearInterval(timerInterval);
  stopPreventSleep();
  randomizeExercise();
});
