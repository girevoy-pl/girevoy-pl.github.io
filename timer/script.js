// Function to detect if the user is on a mobile device
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

// Function to play a beep sound using AudioContext (for mobile devices)
function playBeepMobile() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'square';  // Use a square wave (can change to sine or other types)
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency of 1000 Hz (beep sound)
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // Duration of 100 ms (beep sound)
}

// Function to play a beep sound using MP3 file (for desktop devices)
function playBeepPC() {
    const beep = new Audio('beep-sound.mp3');
    beep.play(); // Play MP3 beep sound
}

// Determine which function to use based on device type
function playBeep() {
    if (isMobileDevice()) {
        playBeepMobile();  // Use AudioContext on mobile
    } else {
        playBeepPC();  // Use MP3 fallback on PC
    }
}

// Beep sound and long beep sound for exercise timer
const beep = new Audio('beep-sound.mp3'); // Regular beep sound
const longBeep = new Audio('long-beep-sound.mp3'); // Long beep sound

// Slider elements for exercise time, rounds, and preparation time
const minuteSlider = document.getElementById('minute-slider');
const secondSlider = document.getElementById('second-slider');
const roundsSlider = document.getElementById('rounds-slider');
const prepareSlider = document.getElementById('prepare-slider');
const restSlider = document.getElementById('rest-slider'); // Rest time slider

// Function to update the timer display
function updateTimerDisplay(time) {
    const minutesLeft = Math.floor(time / 60);
    const secondsLeft = time % 60;
    document.getElementById('timer').textContent = `${minutesLeft < 10 ? '0' + minutesLeft : minutesLeft}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
}

// Initialize the exercise
let currentExercise = '';
let currentRound = 0;
let remainingTime = 0;
let preparationBeepCount = 0; // Track number of preparation beeps
let timerInterval;
let customSettingsActive = false;
let restTime = 0; // Default rest time

// Function to randomize the exercise and set the corresponding time and rounds
function randomizeExercise() {
    currentExercise = getRandomExercise();
    document.getElementById('exercise-btn').textContent = currentExercise.name; // Update button text

    // Update sliders only if "Keep Current Settings" is not active
    if (!customSettingsActive) {
        const [defaultMinute, defaultSecond] = currentExercise.defaultTime.split(':');
        minuteSlider.value = defaultMinute;
        secondSlider.value = defaultSecond;
        roundsSlider.value = currentExercise.defaultRounds;
    }

    // Update slider values on the page
    updateSliderValues();
}

// Exercise data with default time and rounds
const exercises = [
    { name: 'Snatch 1KB', defaultTime: '03:00', defaultRounds: 4 },
    { name: 'Jerk 1KB', defaultTime: '03:00', defaultRounds: 4 },
    { name: 'LC 1KB', defaultTime: '03:00', defaultRounds: 4 },
    { name: 'Jerk 2KB', defaultTime: '03:00', defaultRounds: 3 },
    { name: 'LC 2KB', defaultTime: '03:00', defaultRounds: 3 },
    { name: 'Push-ups', defaultTime: '02:00', defaultRounds: 3 },
    { name: 'Jumping Jacks', defaultTime: '02:00', defaultRounds: 3 },
    { name: 'Clean 1KB', defaultTime: '03:00', defaultRounds: 4 },
    { name: 'Clean 2KB', defaultTime: '03:00', defaultRounds: 3 },
    { name: 'Clean&press 1KB', defaultTime: '03:00', defaultRounds: 4 },
    { name: 'Clean&press 2KB', defaultTime: '03:00', defaultRounds: 3 },
    { name: 'Push press 1KB', defaultTime: '03:00', defaultRounds: 4 },
    { name: 'Push press 2KB', defaultTime: '03:00', defaultRounds: 3 }
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
    document.getElementById('minute-value').textContent = minuteSlider.value;
    document.getElementById('second-value').textContent = secondSlider.value;
    document.getElementById('rounds-value').textContent = roundsSlider.value;
    document.getElementById('prepare-value').textContent = prepareSlider.value;
    document.getElementById('rest-value').textContent = restSlider.value;
}

// Sliders event listeners
minuteSlider.addEventListener('input', updateSliderValues);
secondSlider.addEventListener('input', updateSliderValues);
roundsSlider.addEventListener('input', updateSliderValues);
prepareSlider.addEventListener('input', updateSliderValues);
restSlider.addEventListener('input', function() {
    restTime = parseInt(restSlider.value);
    updateSliderValues(); // Update rest time on the display
});

// Update initial values
updateSliderValues();

// Event listener for "Keep Current Settings" button
document.getElementById('keep-settings-btn').addEventListener('click', function () {
    customSettingsActive = !customSettingsActive;
    this.style.backgroundColor = customSettingsActive ? 'red' : ''; // Change color to red when active
});

// Start button logic
document.getElementById('start-btn').addEventListener('click', function () {
    const exerciseMinute = parseInt(minuteSlider.value);
    const exerciseSecond = parseInt(secondSlider.value);
    const rounds = parseInt(roundsSlider.value);
    const prepareTime = Math.max(parseInt(prepareSlider.value), 5); // Ensure minimum preparation time of 5s

    // Total time for one round in seconds (round time = minutes * 60 + seconds)
    const totalRoundTime = (exerciseMinute * 60) + exerciseSecond;

    // Prepare phase (countdown before rounds start)
    remainingTime = prepareTime;
    currentRound = 0;

    // Stop any existing timer if button clicked
    clearInterval(timerInterval);

    // Start the countdown for the preparation phase
    preparationBeepCount = 0; // Reset the beep count for preparation
    timerInterval = setInterval(() => {
        updateTimerDisplay(remainingTime);

        if (remainingTime > 0) {
            // Beep during preparation phase (3s, 2s, 1s remaining)
            if (remainingTime <= 3 && preparationBeepCount < 3) {
                playBeep();  // Play beep sound (either mobile or desktop)
                preparationBeepCount++;
            }
            remainingTime--;
        } else if (remainingTime === 0 && preparationBeepCount === 3) {
            longBeep.play(); // Long beep to signal the start of the first round
            remainingTime = totalRoundTime; // Set remaining time to round duration
            preparationBeepCount++; // Mark preparation as done
        } else if (remainingTime > 0) {
            // Handle round countdown
            remainingTime--;
        } else if (remainingTime === 0 && currentRound < rounds - 1) {
            // End of the current round (not the last one)
            playBeep(); // Play beep after this round
            currentRound++;
            remainingTime = totalRoundTime; // Reset time for next round
        } else if (remainingTime === 0 && currentRound === rounds - 1) {
            // Last round finished
            longBeep.play();
            clearInterval(timerInterval); // Stop the timer
            updateTimerDisplay(0); // Display 00:00
        }
    }, 1000); // Run every second
});

// Button to stop the current exercise and randomize a new one
document.getElementById('exercise-btn').addEventListener('click', function () {
    clearInterval(timerInterval);  // Stop the current timer
    randomizeExercise();  // Randomize a new exercise
});
