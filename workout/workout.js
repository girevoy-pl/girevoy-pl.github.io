const display = document.getElementById('workout-display');
const slider = document.getElementById('workout-slider');
const numberInput = document.getElementById('workout-number');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const generateBtn = document.getElementById('generate-btn');

const workouts = [
  {
    trainingID: 1,
    title: "30 Minute Full-Body Kettlebell Workout",
    titleUrl: "https://www.youtube.com/watch?v=example_fullbody",
    description: "For today's 30 minute, full-body workout, you only need two things: Yourself and a kettlebell.",
    objective: "INTERVALL | 40/20 | 4 Rounds",
    level: "Intermediate",
    weight: "20kg",
    time: "30m",
    exercises: [
      { name: "Hang Row L", url: "https://www.youtube.com/watch?v=example_row" },
      { name: "Jerk L", url: "https://www.youtube.com/watch?v=example_jerk" },
      { name: "Half Snatch L", url: "https://www.youtube.com/watch?v=example_snatch" },
      { name: "Switch Sides", url: null },
      { name: "Alt. Clean & Jerk", url: "https://www.youtube.com/watch?v=example_cleanjerk" }
    ],
    finisher: "Heavy suitcase carry, 1 min per side"
  },
  {
    trainingID: 2,
    title: "Beginner Workout",
    titleUrl: "https://www.youtube.com/watch?v=example_beginner",
    description: "A simple two-round beginner-friendly kettlebell workout focusing on full-body movements.",
    objective: "2 Rounds",
    level: "Beginner",
    weight: "12kg",
    time: "15m",
    exercises: [
      { name: "10x SH Deadlift per side", url: "https://www.youtube.com/watch?v=example_deadlift" },
      { name: "10x Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "10x Swing", url: "https://www.youtube.com/watch?v=example_swing" },
      { name: "10x Push Up / Modified Burpee", url: "https://www.youtube.com/watch?v=example_pushup" },
      { name: "1 minute rest", url: null }
    ],
    finisher: "Suitcase Walk"
  },
  {
    trainingID: 3,
    title: "The King’s Circuit",
    titleUrl: "https://www.youtube.com/watch?v=example_kingscircuit",
    description: "A challenging full-body kettlebell circuit emphasizing strength, endurance, and symmetry.",
    objective: "Repeat 4 rounds (~28 minutes total)",
    weight: "16kg",
    time: "28m",
    exercises: [
      { name: "2 minutes Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "1 minute Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "1 minute Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "1 minute Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "1 minute Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright" },
      { name: "1 minute Rest", url: null }
    ]
  }
];

function initControls() {
  slider.min = 1;
  slider.max = workouts.length;
  slider.value = 1;
  numberInput.min = 1;
  numberInput.max = workouts.length;
  numberInput.value = 1;
}

function showWorkout(index) {
  const i = Math.max(0, Math.min(workouts.length - 1, index - 1));
  const w = workouts[i];

  const exercisesHTML = w.exercises.map((ex, idx) => `
    <li class="exercise-item">
      <span class="exercise-time">${idx + 1}</span>
      <span class="exercise-desc">
        ${ex.url
          ? `<a href="${ex.url}" target="_blank" rel="noopener noreferrer">${ex.name}</a>`
          : ex.name}
      </span>
    </li>
  `).join('');

  display.innerHTML = `
    <div class="workout-header">
      <h2>#${w.trainingID} - ${
        w.titleUrl
          ? `<a href="${w.titleUrl}" target="_blank" rel="noopener noreferrer">${w.title}</a>`
          : w.title
      }</h2>
    </div>

    <div class="workout-content">
      <p class="status">${w.description}</p>

        <div class="workout-meta aligned bordered">
        <div class="meta-item"><span class="meta-label">Objective:</span> <span class="meta-value">${w.objective}</span></div>
        <div class="meta-item"><span class="meta-label">Level:</span> <span class="meta-value">${w.level || "N/A"}</span></div>
        <div class="meta-item"><span class="meta-label">Weight:</span> <span class="meta-value">${w.weight || "N/A"}</span></div>
        <div class="meta-item"><span class="meta-label">Time:</span> <span class="meta-value">${w.time || "N/A"}</span></div>
    </div>

    <ul class="exercise-list">${exercisesHTML}</ul>

        ${w.finisher ? `
            <div class="workout-meta aligned bordered finisher">
                <div class="meta-item"><span class="meta-label">Finisher:</span> <span class="meta-value">${w.finisher}</span></div>
            </div>
    ` : ""}
    </div>
  `;
}

function updateControls(value) {
  const val = Math.max(1, Math.min(parseInt(value), workouts.length));
  slider.value = val;
  numberInput.value = val;
  showWorkout(val);
}

slider.addEventListener("input", e => updateControls(e.target.value));
numberInput.addEventListener("change", e => updateControls(e.target.value));
plusBtn.addEventListener("click", () => updateControls(Number(numberInput.value) + 1));
minusBtn.addEventListener("click", () => updateControls(Number(numberInput.value) - 1));
generateBtn.addEventListener("click", () => updateControls(Math.floor(Math.random() * workouts.length) + 1));

initControls();
showWorkout(1);
