// Your workouts JSON
const workouts = [{
  "trainingID": 1,
  "date": "2025-10-28T00:00:00Z",
  "title": "30 Minute Full-Body Kettlebell Workout",
  "description": "For today's 30 minute, full-body workout, you only need two things: Yourself and a kettlebell. Can't get more basic than that!",
  "objective": "INTERVALL | 40/20 | 4 Rounds",
  "level": "Intermediate",
  "weight": "20kg",
  "time": "30m",
  "exercises": [
    "Hang Row L",
    "Jerk L",
    "Half Snatch L",
    "Switch Sides",
    "After Right side, then: Alt. Clean & Jerk"
  ],
  "finisher": "Heavy suitcase carry, 1 min per side"
},
{
  "trainingID": 2,
  "date": "2025-10-16T00:00:00Z",
  "title": "Beginner Workout",
  "description": "A simple two-round beginner-friendly kettlebell workout focusing on full-body movements.",
  "objective": "2 Rounds",
  "level": "Beginner",
  "weight": "12kg",
  "time": "15m",
  "exercises": [
    "10x SH Deadlift per side",
    "10x Goblet Squat",
    "10x Swing",
    "10x Push Up / Modified Burpee (2nd round)",
    "1 minute rest"
  ],
  "finisher": "Suitcase Walk"
},
{
  "trainingID": 3,
  "date": "2025-10-30T00:00:00Z",
  "title": "The King’s Circuit",
  "description": "A challenging full-body kettlebell circuit emphasizing strength, endurance, and symmetry through alternating sides.",
  "objective": "Repeat 4 rounds (~28 minutes total)",
  "level": "Intermediate",
  "weight": "16kg",
  "time": "28m",
  "exercises": [
    "2 minutes Goblet Squat",
    "1 minute Clean & Jerk (left)",
    "1 minute Clean & Jerk (right)",
    "1 minute Snatch (left)",
    "1 minute Snatch (right)",
    "1 minute Rest"
  ],
  "finisher": null
}
];

// DOM elements
const display = document.getElementById('workout-display');
const slider = document.getElementById('workout-slider');
const numberInput = document.getElementById('workout-number');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const generateBtn = document.getElementById('generate-btn'); // 👈 Add this to your HTML

// Display a selected workout
function showWorkout(index) {
  const i = parseInt(index) - 1;
  if (i < 0 || i >= workouts.length) return;

  const w = workouts[i];
  const exercisesHTML = w.exercises.map(ex => `<li>${ex}</li>`).join('');

  display.innerHTML = `
    <div class="round-indicator">#${w.trainingID}</div>
    <h2 class="phase-label">${w.title}</h2>
    <p class="status">${w.description}</p>
    <div style="margin:10px 0;">
      <p><strong>Objective:</strong> ${w.objective}</p>
      <p><strong>Level:</strong> ${w.level || "N/A"}</p>
      <p><strong>Weight:</strong> ${w.weight || "N/A"}</p>
      <p><strong>Time:</strong> ${w.time || "N/A"}</p>
    </div>
    <ul style="text-align:left;margin:10px 0 10px 20px;">${exercisesHTML}</ul>
    ${w.finisher ? `<p><strong>Finisher:</strong> ${w.finisher}</p>` : ""}
  `;

  // Subtle highlight animation
  display.style.background = "var(--active)";
  display.style.color = "#fff";
  setTimeout(() => {
    display.style.background = "#fff";
    display.style.color = "var(--text)";
  }, 300);
}

// Synchronize all inputs
function updateControls(value) {
  numberInput.value = value;
  slider.value = value;
  showWorkout(value);
}

// Slider changes
slider.addEventListener("input", e => updateControls(e.target.value));

// Stepper input change
numberInput.addEventListener("change", e => {
  const val = Math.min(Math.max(1, e.target.value), workouts.length);
  updateControls(val);
});

// Plus / minus buttons
plusBtn.addEventListener("click", () => {
  let val = parseInt(numberInput.value);
  if (val < workouts.length) updateControls(val + 1);
});

minusBtn.addEventListener("click", () => {
  let val = parseInt(numberInput.value);
  if (val > 1) updateControls(val - 1);
});

// Generate random workout button
generateBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * workouts.length) + 1;
  updateControls(randomIndex);
});

// Initialize with workout #1
showWorkout(1);
