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
    title: "15 minutes to win it!",
    titleUrl: "https://www.youtube.com/watch?v=example_beginner",
    description: "A simple two-round beginner-friendly kettlebell workout focusing on full-body movements.",
    objective: "2 Rounds",
    level: "Beginner",
    weight: "12kg",
    time: "15m",
    exercises: [
      { name: "10rep - SH Deadlift per side", url: "https://www.youtube.com/watch?v=example_deadlift" },
      { name: "10rep - Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "10rep - Swing", url: "https://www.youtube.com/watch?v=example_swing" },
      { name: "10rep - Push Up / Modified Burpee", url: "https://www.youtube.com/watch?v=example_pushup" },
      { name: "1min  - Rest", url: null }
    ],
    finisher: "Suitcase Walk"
  },
  {
    trainingID: 3,
    title: "The King’s Circuit",
    titleUrl: "https://www.youtube.com/watch?v=example_kingscircuit",
    description: "A challenging full-body kettlebell circuit emphasizing strength, endurance, and symmetry.",
    objective: "Repeat 4 rounds (~28 minutes total)",
    level: "Intermediate",
    weight: "16kg",
    time: "28m",
    exercises: [
      { name: "2 min - Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "1 min - Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "1 min - Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "1 min - Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright" },
      { name: "1 min - Rest", url: null }
    ]
  },
  {
    trainingID: 4,
    title: "Full Body Workout",
    titleUrl: "https://www.youtube.com/watch?v=mETdNKevQ8Y",
    description: "It's an all-in-one strength, cardio, and conditioning tool.",
    objective: "2x EMOM (15 min, 10 reps per exercise)",
    level: "Beginner",
    weight: "16kg",
    time: "30m",
    exercises: [
      { name: "Round 1 - 10rep - Deadlift (Left)", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Round 1 - 10rep - Deadlift (Right)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "Round 1 - 10rep - Goblet Squat", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Round 1 - 10rep - Double Hand Swing", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "Round 1 - 10rep - Push Up", url: "https://www.youtube.com/watch?v=example_snatchright" },
      { name: "Round 1 - 1 min   - Rest", url: null },
      { name: "Round 2 - 10rep - Deadlift (Left)", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Round 2 - 10rep - Deadlift (Right)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "Round 2 - 10rep - Goblet Squat", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Round 2 - 10rep - Double Hand Swing", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "Round 2 - 5rep - Burpee", url: "https://www.youtube.com/watch?v=example_snatchright" },
      { name: "Round 2 - 1 min   - Rest", url: null }
    ],
    finisher: "1 min per site - Clean & Jerk"
  },
  {
    trainingID: 5,
    title: "We're going back to the vault, Marty!",
    titleUrl: "https://www.youtube.com/watch?v=cwuyJ71LKqc",
    description: "Follow-along designed to melt calories, build strength and kick start your fat loss journey",
    objective: "Warm Up",
    level: "Beginner",
    weight: "16kg",
    time: "25m",
    exercises: [
      { name: "Round 1 - 2 mmin - Power Clean", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Round 1 - 2x - 10reps - DH Swing", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "Round 1 - 2 min - Power Clean, Squat & DH Press Flow", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Round 1 - 1 min - Rest", url: null },
      { name: "Round 2 - 2 min - Power Clean", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "Round 2 - 2x 15rep - DH Swing", url: "https://www.youtube.com/watch?v=example_snatchright" },
      { name: "Round 2 - 2 min - Power Clean, Squat & DH Press Flow", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Round 2 - 1 min - Rest", url: null },
      { name: "Round 3 - 1 min - Clean (Left)", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Round 3 - 1 min - Clean (Right)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "Round 3 - 2 min - H2H Swing", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Round 3 - 1 min - Clean Left, Rack Squat & Press Flow ", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "Round 3 - 1 min - Clean Right, Rack Squat & Press Flow", url: "https://www.youtube.com/watch?v=example_snatchright" },
      { name: "Round 3 - 1 min - Rest", url: null }
    ],
    finisher: "10 Burpees | Cool Down: Walk it off!"
  },
  {
    trainingID: 6,
    title: "It checks ALL the boxes",
    titleUrl: "https://www.youtube.com/watch?v=5aWCIXwRNYg",
    description: "It's a full body workout that builds core-strength, overall strength, cardio, stamina and vaporizes calories.",
    objective: "2 rounds for 6min - with 2KB, 4 rounds for 6 min with 1KB - as many reps as possible",
    weight: "16kg",
    level: "Intermediate",
    time: "12m",
    exercises: [
      { name: "3rep -  Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "3rep - Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "3rep - Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "3rep - Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright" },
      { name: "1 min - Rest", url: null }
    ],
    finisher: "Farmer's Carry, 2 min."
  },
  {
    trainingID: 7,
    title: "Build muscle w/ Coach's workout",
    titleUrl: "https://www.youtube.com/watch?v=ccLQXBTmwVY",
    description: "You’ll move through 4 supersets with the 10-8-6 principle: 10 reps with lighter weight, 8 reps with moderate weight and 6 reps with heavy weight.",
    objective: "Warm Up: 5 min mobility, 40 SH swings, 40 mace swings",
    weight: "16-20-24kg",
    level: "Advanced",
    time: "30m",
    exercises: [
      { name: "Superset 1 - 10x16kg, 8x20kg, 6x24kg - Jerk + Pull Up", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Superset 2 - 10x16kg, 8x20kg, 6x24kg - Half Snatch + Deficit Push Up", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "Superset 3 - 10x16kg, 8x20kg, 6x24kg - Renegade Row + Dips", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Superset 4 - 10x16kg, 8x20kg, 6x24kg - Snatch + Burpee", url: "https://www.youtube.com/watch?v=example_snatchleft" }
    ],
    finisher: "Cool Down: 5 min fast walk on treadmill."
  },
  {
    trainingID: 8,
    title: "Get stronger, anywhere, anytime!",
    titleUrl: "https://www.youtube.com/watch?v=cwuyJ71LKqc",
    description: "Follow-along designed to melt calories, build strength and kick start your fat loss journey",
    objective: "Warm Up",
    level: "Beginner",
    weight: "12kg",
    time: "20m",
    exercises: [
      { name: "Round 1&2 - 1 min - Row L", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Round 1&2 - 1 min - Row R", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "Round 1&2 - 1 min - Press L", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Round 1&2 - 1 min - Press R", url: null },
      { name: "Round 1&2 - 1 min - Thruster L", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "Round 1&2 - 1 min - Thruster R", url: "https://www.youtube.com/watch?v=example_snatchright" },
      { name: "Rest", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Round 3 - 1 min - Clean & Jerk L", url: null },
      { name: "Round 3 - 1 min - Clean & Jerk R", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Round 3 - 2 min - H2H Swing", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "Round 3 - 2 min - Snatch L", url: null },
      { name: "Round 3 - 2 min - Snatch R", url: null }
    ]
  },
  {
    trainingID: 9,
    title: "Make it Lebe Park day workout",
    titleUrl: "https://www.youtube.com/watch?v=RYrATCQJnY0",
    description: "Repeat each subset 10x. If this looks too challenging, adjust it- knock off a rep or use a lower weight.",
    objective: "Warm Up: Suitcase Walk to your favorite spot (switch hands at will)",
    weight: "16kg",
    level: "Intermediate",
    time: "30m",
    exercises: [
      { name: "Superset 1 - 3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Superset 1 - 3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Superset 1 - 3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Superset 1 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "Superset 2 - Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "Superset 2 - Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Superset 2 - Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft" }
    ],
    finisher: "25x Military Burpees."
  },
  {
    trainingID: 10,
    title: "Build muscle, lose the fat workout",
    titleUrl: "https://www.youtube.com/watch?v=-M1MGrzVp8A",
    description: "2x Part 1, 3x Part 2 ",
    objective: "Warm Up: Suitcase Walk to your favorite spot (switch hands at will)",
    weight: "16kg",
    level: "Intermediate",
    time: "20m",
    exercises: [
      { name: "Part 1 - 10x - Snatches per side", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Part 1 -  6x - Renegade rows superset", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Part 1 - Farmers carry", url: "https://www.youtube.com/watch?v=example_gobletsquat" },
      { name: "Part 1 -  5x - High pulls per side", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "Part 1 - 10x - Swings per side superset", url: "https://www.youtube.com/watch?v=example_cleanjerkleft" },
      { name: "Part 2 - 15x - Snatches L", url: "https://www.youtube.com/watch?v=example_cleanjerkright" },
      { name: "Part 2 - 15x - Snatches R", url: "https://www.youtube.com/watch?v=example_snatchleft" },
      { name: "Part 2 -  5x - Renegade rows (EMOM)", url: "https://www.youtube.com/watch?v=example_snatchleft" }
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
