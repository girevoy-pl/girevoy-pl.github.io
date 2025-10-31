// Your workouts JSON
const workouts = [
  {
    "trainingID": 1,
    "date": "2025-10-28T00:00:00Z",
    "title": "30 Minute Full-Body Kettlebell Workout",
    "titleUrl": "https://www.youtube.com/watch?v=Xk4czNl5jks",   // 👈 new field
    "description": "For today's 30 minute, full-body workout, you only need two things: Yourself and a kettlebell. Can't get more basic than that!",
    "objective": "INTERVALL | 40/20 | 4 Rounds",
    "level": "Intermediate",
    "weight": "20kg",
    "time": "30m",

    // Each exercise is now an object with name + optional URL
    "exercises": [
      { "name": "Hang Row L", "url": "https://www.youtube.com/watch?v=example_row" },
      { "name": "Jerk L", "url": "https://www.youtube.com/watch?v=example_jerk" },
      { "name": "Half Snatch L", "url": "https://www.youtube.com/watch?v=example_snatch" },
      { "name": "Switch Sides", "url": null },
      { "name": "After Right side, then: Alt. Clean & Jerk", "url": "https://www.youtube.com/watch?v=example_cleanjerk" }
    ],

    "finisher": "Heavy suitcase carry, 1 min per side",
    "finisherUrl": "https://www.youtube.com/watch?v=example_suitcase"  // 👈 optional
  },

  {
    "trainingID": 2,
    "date": "2025-10-16T00:00:00Z",
    "title": "Beginner Workout",
    "titleUrl": "https://www.youtube.com/watch?v=6JWTccTm2xU",
    "description": "A simple two-round beginner-friendly kettlebell workout focusing on full-body movements.",
    "objective": "2 Rounds",
    "level": "Beginner",
    "weight": "12kg",
    "time": "15m",
    "exercises": [
      { "name": "10x SH Deadlift per side", "url": "https://www.youtube.com/watch?v=example_deadlift" },
      { "name": "10x Goblet Squat", "url": "https://www.youtube.com/watch?v=example_gobletsquat" },
      { "name": "10x Swing", "url": "https://www.youtube.com/watch?v=example_swing" },
      { "name": "10x Push Up / Modified Burpee (2nd round)", "url": "https://www.youtube.com/watch?v=example_pushup" },
      { "name": "1 minute rest", "url": null }
    ],
    "finisher": "Suitcase Walk",
    "finisherUrl": "https://www.youtube.com/watch?v=example_suitcasewalk"
  },

  {
    "trainingID": 3,
    "date": "2025-10-30T00:00:00Z",
    "title": "The King’s Circuit",
    "titleUrl": "https://www.youtube.com/watch?v=lsodl1DET6s",
    "description": "A challenging full-body kettlebell circuit emphasizing strength, endurance, and symmetry through alternating sides.",
    "objective": "Repeat 4 rounds (~28 minutes total)",
    "weight": "16kg",
    "time": "28m",
    "exercises": [
      { "name": "2 minutes Goblet Squat", "url": "https://www.youtube.com/watch?v=example_gobletsquat" },
      { "name": "1 minute Clean & Jerk (left)", "url": "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { "name": "1 minute Clean & Jerk (right)", "url": "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { "name": "1 minute Snatch (left)", "url": "https://www.youtube.com/watch?v=example_snatchleft" },
      { "name": "1 minute Snatch (right)", "url": "https://www.youtube.com/watch?v=example_snatchright" },
      { "name": "1 minute Rest", "url": null }
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

// === Show a selected workout ===
function showWorkout(index) {
  const i = parseInt(index) - 1;
  if (i < 0 || i >= workouts.length) return;

  const w = workouts[i];

  // Map exercises → clickable if URL exists
  const exercisesHTML = w.exercises
    .map(ex => 
      `<li>${ex.url 
        ? `<a href="${ex.url}" target="_blank" rel="noopener noreferrer">${ex.name}</a>`
        : ex.name}</li>`
    )
    .join('');

  // Finisher with optional link
  const finisherHTML = w.finisher
    ? `<p><strong>Finisher:</strong> ${
        w.finisherUrl 
          ? `<a href="${w.finisherUrl}" target="_blank" rel="noopener noreferrer">${w.finisher}</a>` 
          : w.finisher
      }</p>`
    : "";

  // Display block
  display.innerHTML = `
    <div class="round-indicator">#${w.trainingID}</div>
    <h2 class="phase-label">${
      w.titleUrl 
        ? `<a href="${w.titleUrl}" target="_blank" rel="noopener noreferrer">${w.title}</a>` 
        : w.title
    }</h2>
    <p class="status">${w.description}</p>
    <div style="margin:10px 0;">
      <p><strong>Objective:</strong> ${w.objective}</p>
      <p><strong>Level:</strong> ${w.level || "N/A"}</p>
      <p><strong>Weight:</strong> ${w.weight || "N/A"}</p>
      <p><strong>Time:</strong> ${w.time || "N/A"}</p>
    </div>
    <ul style="text-align:left;margin:10px 0 10px 20px;">${exercisesHTML}</ul>
    ${finisherHTML}
  `;

  // Subtle highlight effect
  display.style.background = "var(--active)";
  display.style.color = "#fff";
  setTimeout(() => {
    display.style.background = "#fff";
    display.style.color = "var(--text)";
  }, 300);
}

// === Controls synchronization ===
function updateControls(value) {
  numberInput.value = value;
  slider.value = value;
  showWorkout(value);
}

// === Event listeners ===
slider.addEventListener("input", e => updateControls(e.target.value));

numberInput.addEventListener("change", e => {
  const val = Math.min(Math.max(1, e.target.value), workouts.length);
  updateControls(val);
});

plusBtn.addEventListener("click", () => {
  let val = parseInt(numberInput.value);
  if (val < workouts.length) updateControls(val + 1);
});

minusBtn.addEventListener("click", () => {
  let val = parseInt(numberInput.value);
  if (val > 1) updateControls(val - 1);
});

// Generate random workout
generateBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * workouts.length) + 1;
  updateControls(randomIndex);
});

// Initialize
showWorkout(1);
