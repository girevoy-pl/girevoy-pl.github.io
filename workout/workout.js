/* ============================================================
   DOM REFERENCES
============================================================ */
const display = document.getElementById('workout-display');
const slider = document.getElementById('workout-slider');
const numberInput = document.getElementById('workout-number');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const generateBtn = document.getElementById('generate-btn');

const startGuidedBtn = document.getElementById('start-guided-btn');
const pauseBtn = document.getElementById('pause-btn');
const guidedContainer = document.getElementById('guided-container');
const guidedTimer = document.getElementById('guided-timer');
const guidedList = document.getElementById('guided-list'); // used as container under progress bar

/* ============================================================
   DATA
============================================================ */
const workouts = [
  {
    trainingID: 1,
    title: "30 Minute Full-Body Kettlebell Workout",
    titleUrl: "https://www.youtube.com/watch?v=example_fullbody",
    description: "For today's 30 minute, full-body workout, you only need two things: Yourself and a kettlebell.",
    objective: "INTERVALL | 40/20 | 4 Rounds",
    type: "Interval",
    level: "Intermediate",
    weight: "20kg",
    time: "30m",
    rounds: "4",
    reps: null,
    exercises: [
      { round: 1, weight: 20, load: 1, side: 'L', name: "Hang Row", url: "https://www.youtube.com/watch?v=example_row", rep:null, duration: 60, rest: 30  },
      { round: 1, weight: 20, load: 1, side: 'L',name: "Jerk", url: "https://www.youtube.com/watch?v=example_jerk", rep:null, duration: 60, rest: 30  },
      { round: 1, weight: 20, load: 1, side: 'L',name: "Half Snatch", url: "https://www.youtube.com/watch?v=example_snatch", rep:null, duration: 60, rest: 30 },
      //{ round: 1, weight: null, load: null, side: null ,name: "Switch Sides", url: null, rep:null, duration: 5, rest: 0 },
      { round: 2, weight: 20, load: 1, side: 'L', name: "Alt. Clean & Jerk", url: "https://www.youtube.com/watch?v=example_cleanjerk", rep:null, duration: 60, rest: 30 },

      { round: 2, weight: 20, load: 1, side: 'R', name: "Hang Row", url: "https://www.youtube.com/watch?v=example_row", rep:null, duration: 60, rest: 30  },
      { round: 2, weight: 20, load: 1, side: 'R', name: "Jerk", url: "https://www.youtube.com/watch?v=example_jerk", rep:null, duration: 60, rest: 30  },
      { round: 2, weight: 20, load: 1, side: 'R', name: "Half Snatch", url: "https://www.youtube.com/watch?v=example_snatch", rep:null, duration: 60, rest: 30 },
      //{ round: 2, weight: null, load: 1, side: null, name: "Switch Sides", url: null, rep:null, duration: 5, rest: 0 },
      { round: 3, weight: 20, load: 1, side: 'R', name: "Alt. Clean & Jerk", url: "https://www.youtube.com/watch?v=example_cleanjerk", rep:null, duration: 60, rest: 30 },

      { round: 3, weight: 20, load: 1, side: 'L', name: "Hang Row", url: "https://www.youtube.com/watch?v=example_row", rep:null, duration: 60, rest: 30  },
      { round: 3, weight: 20, load: 1, side: 'L', name: "Jerk", url: "https://www.youtube.com/watch?v=example_jerk", rep:null, duration: 60, rest: 30  },
      { round: 3, weight: 20, load: 1, side: 'L', name: "Half Snatch", url: "https://www.youtube.com/watch?v=example_snatch", rep:null, duration: 60, rest: 30 },
      //{ round: 3, weight: null, load: null, side: null, name: "Switch Sides", url: null, rep:null, duration: 5, rest: 0 },
      { round: 4, weight: 20, load: 1, side: 'L', name: "Alt. Clean & Jerk", url: "https://www.youtube.com/watch?v=example_cleanjerk", rep:null, duration: 60, rest: 30 },

      { round: 4, weight: 20, load: 1, side: 'R', name: "Hang Row", url: "https://www.youtube.com/watch?v=example_row", rep:null, duration: 60, rest: 30  },
      { round: 4, weight: 20, load: 1, side: 'R', name: "Jerk", url: "https://www.youtube.com/watch?v=example_jerk", rep:null, duration: 60, rest: 30  },
      { round: 4, weight: 20, load: 1, side: 'R', name: "Half Snatch", url: "https://www.youtube.com/watch?v=example_snatch", rep:null, duration: 60, rest: 30 },
      //{ round: 4, weight: null, load: null, side: null, name: "Switch Sides", url: null, rep:null, duration: 5, rest: 0 },
      { round: 4, weight: 20, load: 1, side: 'R', name: "Alt. Clean & Jerk", url: "https://www.youtube.com/watch?v=example_cleanjerk", rep:null, duration: 60, rest: 30 }
    ],
    finisher: "Heavy suitcase carry, 1 min per side", finisherload: 1, finisherside: 'LR', finisherweight:null, finisherrep: null, finisherduration: 120, finisherrest: 0
  },
  {
    trainingID: 2,
    title: "15 minutes to win it!",
    titleUrl: "https://www.youtube.com/watch?v=example_beginner",
    description: "A simple two-round beginner-friendly kettlebell workout focusing on full-body movements.",
    objective: "2 Rounds",
    type: null,
    level: "Beginner",
    weight: "12kg",
    time: "15m",
    rounds: "2",
    reps: "10",
    exercises: [
      { round: 1, weight: 12, load: 1, side: 'L', name: "SH Deadlift per side", url: "https://www.youtube.com/watch?v=example_deadlift", rep: 10, duration: 60, rest: 5 },
      { round: 1, weight: 12, load: 1, side: 'L', name: "Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep: 10, duration: 60, rest: 5 },
      { round: 1, weight: 12, load: 1, side: 'L', name: "Swing", url: "https://www.youtube.com/watch?v=example_swing", rep: 10, duration: 60, rest: 5 },
      { round: 1, weight: 12, load: 1, side: 'L', name: "Push Up / Modified Burpee", url: "https://www.youtube.com/watch?v=example_pushup", rep: 10, duration: 60, rest: 5 },
      { round: 1, weight: 12, load: null, side: null, name: "Rest", url: null, rep: null, duration: 60, rest: 0 },

      { round: 2, weight: 12, load: 1, side: 'R', name: "SH Deadlift per side", url: "https://www.youtube.com/watch?v=example_deadlift", rep: 10, duration: 60, rest: 5 },
      { round: 2, weight: 12, load: 1, side: 'R', name: "Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep: 10, duration: 60, rest: 5 },
      { round: 2, weight: 12, load: 1, side: 'R', name: "Swing", url: "https://www.youtube.com/watch?v=example_swing", rep: 10, duration: 60, rest: 5 },
      { round: 2, weight: 12, load: 1, side: 'R', name: "Push Up / Modified Burpee", url: "https://www.youtube.com/watch?v=example_pushup", rep: 10, duration: 60, rest: 5 },
      { round: 2, weight: 12, load: null, side: null, name: "Rest", url: null, rep: null, duration: 60, rest: 0 }

    ],
    finisher: "Suitcase Walk", finisherweight: null,  finisherurl: null, finisherrep: null, finisherduration: 60, finisherrest: 0
  },
  {
    trainingID: 3,
    title: "The King’s Circuit",
    titleUrl: "https://www.youtube.com/watch?v=example_kingscircuit",
    description: "A challenging full-body kettlebell circuit emphasizing strength, endurance, and symmetry.",
    objective: "Repeat 4 rounds (~28 minutes total)",
    type : null,
    level: "Intermediate",
    weight: "16kg",
    time: "28m",
    rounds: "4",
    reps: null,
    exercises: [
      { round: 1, weight: 16, load: 1, side: null, name: "Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 120, rest: 3 },
      { round: 1, weight: 16, load: 1, side: 'L', name: "Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 3 },
      { round: 1, weight: 16, load: 1, side: 'R', name: "Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 3 },
      { round: 1, weight: 16, load: 1, side: 'L', name: "Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 3 },
      { round: 1, weight: 16, load: 1, side: 'R', name: "Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 3 },
      { round: 1, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 2, weight: 16, load: 1, side: null, name: "Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 120, rest: 3 },
      { round: 2, weight: 16, load: 1, side: 'L', name: "Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 3 },
      { round: 2, weight: 16, load: 1, side: 'R', name: "Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 3 },
      { round: 2, weight: 16, load: 1, side: 'L', name: "Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 3 },
      { round: 2, weight: 16, load: 1, side: 'R', name: "Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 3 },
      { round: 2, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 3, weight: 16, load: 1, side: null, name: "Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 120, rest: 3 },
      { round: 3, weight: 16, load: 1, side: 'L', name: "Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 3 },
      { round: 3, weight: 16, load: 1, side: 'R', name: "Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 3 },
      { round: 3, weight: 16, load: 1, side: 'L', name: "Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 3 },
      { round: 3, weight: 16, load: 1, side: 'R', name: "Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 3 },
      { round: 3, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 4, weight: 16, load: 1, side: null, name: "Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 120, rest: 3 },
      { round: 4, weight: 16, load: 1, side: 'L', name: "Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 3 },
      { round: 4, weight: 16, load: 1, side: 'R', name: "Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 3 },
      { round: 4, weight: 16, load: 1, side: 'L', name: "Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 3 },
      { round: 4, weight: 16, load: 1, side: 'R', name: "Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 3 },
      { round: 4, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: 0 }
    ]
  },
  {
    trainingID: 4,
    title: "Full Body Workout",
    titleUrl: "https://www.youtube.com/watch?v=mETdNKevQ8Y",
    description: "It's an all-in-one strength, cardio, and conditioning tool.",
    objective: "2x EMOM (15 min, 10 reps per exercise)",
    type: "EMOM",
    level: "Beginner",
    weight: "16kg",
    time: "30m",
    rounds: null,
    reps: "10",
    exercises: [
      { round:1, weight: 16, load: 1, side: 'L', name: "Deadlift", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: 0 },
      { round:1, weight: 16, load: 1, side: 'R', name: "Deadlift", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: 0 },
      { round:1, weight: 16, load: 1, side: null, name: "Goblet Squat", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:10, duration: null, rest: 0 },
      { round:1, weight: 16, load: 2, side: 'LR', name: "Double Hand Swing", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:10, duration: null, rest: 0 },
      { round:1, weight: 16, load: null, side: null, name: "Push Up", url: "https://www.youtube.com/watch?v=example_snatchright", rep:10, duration: null, rest: 0 },
      { round:1, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round:2, weight: 16, load: 1, side: 'L', name: "Deadlift", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: 0 },
      { round:2, weight: 16, load: 1, side: 'R', name: "Deadlift", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: 0 },
      { round:2, weight: 16, load: 1, side: null, name: "Goblet Squat", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:10, duration: null, rest: 0 },
      { round:2, weight: 16, load: 1, side: null, name: "Double Hand Swing", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:10, duration: null, rest: 0 },
      { round:2, weight: 16, load: null, side: null, name: "Burpee", url: "https://www.youtube.com/watch?v=example_snatchright", rep:5, duration: null, rest: 0 },
      { round:2, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: 0 }
    ],
    finisher: "1 min per site - Clean & Jerk", finisherweight: 16, finisherrep:null, finisherduration: 60, finisherrest: 0
  },
  {
    trainingID: 5,
    title: "We're going back to the vault, Marty!",
    titleUrl: "https://www.youtube.com/watch?v=cwuyJ71LKqc",
    description: "Follow-along designed to melt calories, build strength and kick start your fat loss journey",
    objective: "Warm Up",
    type: null,
    level: "Beginner",
    weight: "16kg",
    time: "25m",
    rounds: "3",
    reps: null,
    exercises: [
      { round: 1, weight: 16, load: 1, side: 'L', name: "Power Clean", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 120, rest: 5 },
      { round: 1, weight: 16, load: 1, side: 'LR', name: "DH Swing", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:20, duration: 60, rest: 5 },
      { round: 1, weight: 16, load: 1, side: 'L', name: "Power Clean, Squat & DH Press Flow", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 120, rest: 5 },
      { round: 1, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 2, weight: 16, load: 1, side: 'R', name: "Power Clean", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 120, rest: 5 },
      { round: 2, weight: 16, load: 1, side: 'LR', name: "2x 15rep - DH Swing", url: "https://www.youtube.com/watch?v=example_snatchright", rep:30, duration: 60, rest: 5 },
      { round: 2, weight: 16, load: 1, side: 'R', name: "Power Clean, Squat & DH Press Flow", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 120, rest: 5 },
      { round: 2, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 3, weight: 16, load: 1, side: 'L', name: "Clean", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: 5 },
      { round: 3, weight: 16, load: 1, side: 'R', name: "Clean", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 5 },
      { round: 3, weight: 16, load: 1, side: 'LR', name: "H2H Swing", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 120, rest: 5 },
      { round: 3, weight: 16, load: 1, side: 'L', name: "Clean Left, Rack Squat & Press Flow ", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 5 },
      { round: 3, weight: 16, load: 1, side: 'R', name: "Clean Right, Rack Squat & Press Flow", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 5 },
      { round: 3, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: 0 }
    ],
    finisher: "10 Burpees | Cool Down: Walk it off!", finisherweight: null, finisherurl: null, rep: 10, finisherduration: 30, finisherrest: 0 
  },
  {
    trainingID: 6,
    title: "It checks ALL the boxes",
    titleUrl: "https://www.youtube.com/watch?v=5aWCIXwRNYg",
    description: "It's a full body workout that builds core-strength, overall strength, cardio, stamina and vaporizes calories.",
    objective: "2 rounds for 6min - with 2KB, 4 rounds for 6 min with 1KB - as many reps as possible",
    type: null,
    weight: "16kg",
    level: "Intermediate",
    time: "12m",
    rounds: "6",
    reps: null,
    exercises: [
      { round: 1, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: 60, rest: null },
      { round: 1, weight: 16, load: 1, side: 'LR', name: "Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: 60, rest: null },
      { round: 1, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: 60, rest: null },
      { round: 1, weight: 16, load: 1, side: 'LR', name: "Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: 60, rest: null },
      { round: 1, weight: 16, load: 1, side: 'L', name: "Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 1, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 2, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: 60, rest: null },
      { round: 2, weight: 16, load: 1, side: 'LR', name: "Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: 60, rest: null },
      { round: 2, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 2, weight: 16, load: 1, side: 'LR', name: "Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: 60, rest: null },
      { round: 2, weight: 16, load: 1, side: 'R', name: "Snatch", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 2, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 3, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: 60, rest: null },
      { round: 3, weight: 16, load: 1, side: 'LR', name: "Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: 60, rest: null },
      { round: 3, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: 60, rest: null },
      { round: 3, weight: 16, load: 1, side: 'LR', name: "Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: 60, rest: null },
      { round: 3, weight: 16, load: 1, side: 'L', name: "Snatch", url: "https://www.youtube.com/watch?v=example_snatchright" , rep:null, duration: 60, rest: null},
      { round: 3, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 4, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: 60, rest: null },
      { round: 4, weight: 16, load: 1, side: 'LR', name: "Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: 60, rest: null },
      { round: 4, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: 60, rest: null },
      { round: 4, weight: 16, load: 1, side: 'LR', name: "Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: 60, rest: null },
      { round: 4, weight: 16, load: 1, side: 'R', name: "Snatch", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 4, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 5, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: 60, rest: null },
      { round: 5, weight: 16, load: 1, side: 'LR', name: "Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: 60, rest: null },
      { round: 5, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: 60, rest: null },
      { round: 5, weight: 16, load: 1, side: 'LR', name: "Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: 60, rest: null },
      { round: 5, weight: 16, load: 1, side: 'L', name: "Snatch", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 5, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 6, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: 60, rest: null },
      { round: 6, weight: 16, load: 1, side: 'LR', name: "Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: 60, rest: null },
      { round: 6, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: 60, rest: null },
      { round: 6, weight: 16, load: 1, side: 'LR', name: "Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: 60, rest: null },
      { round: 6, weight: 16, load: 1, side: 'LR', name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 6, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null }
    ],
    finisher: "2min - Farmer's Carry", finisherweight: 16, finisherrep:null, finisherduration: 120, finisherrest: null
  },
  {
    trainingID: 7,
    title: "Build muscle w/ Coach's workout",
    titleUrl: "https://www.youtube.com/watch?v=ccLQXBTmwVY",
    description: "You’ll move through 4 supersets with the 10-8-6 principle: 10 reps with lighter weight, 8 reps with moderate weight and 6 reps with heavy weight.",
    objective: "Warm Up: 5 min mobility, 40 SH swings, 40 mace swings",
    type: null,
    weight: "16-20-24kg",
    level: "Advanced",
    time: "30m",
    rounds: "4",
    reps: null,
    exercises: [
      { round: 1, weight: 16, load: 1, side: 'L', name: "Jerk + Pull Up", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: null },
      { round: 1, weight: 20, load: 1, side: 'L', name: "Jerk + Pull Up", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:8, duration: null, rest: null },
      { round: 1, weight: 24, load: 1, side: 'L', name: "Jerk + Pull Up", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:6, duration: null, rest: null },

      { round: 2, weight: 16, load: 1, side: 'L', name: "Half Snatch + Deficit Push Up", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: null },
      { round: 2, weight: 20, load: 1, side: 'L', name: "Half Snatch + Deficit Push Up", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:8, duration: null, rest: null },
      { round: 2, weight: 24, load: 1, side: 'L', name: "Half Snatch + Deficit Push Up", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:6, duration: null, rest: null },

      { round: 3, weight: 16, load: 1, side: 'L', name: "Renegade Row + Dips", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:10, duration: null, rest: null },
      { round: 3, weight: 20, load: 1, side: 'L', name: "Renegade Row + Dips", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:8, duration: null, rest: null },
      { round: 3, weight: 24, load: 1, side: 'L', name: "Renegade Row + Dips", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:6, duration: null, rest: null },

      { round: 4, weight: 16, load: 1, side: 'L', name: "Snatch + Burpee", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:10, duration: null, rest: null },
      { round: 4, weight: 20, load: 1, side: 'L', name: "Snatch + Burpee", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:8, duration: null, rest: null },
      { round: 4, weight: 24, load: 1, side: 'L', name: "Snatch + Burpee", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:6, duration: null, rest: null }
    ],
    finisher: "Cool Down: 5 min fast walk on treadmill.", finisherweight: null, finisherrep:null, finisherduration: 300, finisherrest: null
  },
  {
    trainingID: 8,
    title: "Get stronger, anywhere, anytime!",
    titleUrl: "https://www.youtube.com/watch?v=cwuyJ71LKqc",
    description: "Follow-along designed to melt calories, build strength and kick start your fat loss journey",
    objective: "Warm Up",
    type: null,
    level: "Beginner",
    weight: "12kg",
    time: "20m",
    rounds: 3,
    reps: null,
    exercises: [
      { round: 1, weight: 12, load: 1, side: 'L', name: "Row", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, load: 1, side: 'R', name: "Row", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, load: 1, side: 'L', name: "Press", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, load: 1, side: 'R', name: "Press", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, load: 1, side: 'L', name: "Thruster", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, load: 1, side: 'R', name: "Thruster", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 1, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 2, weight: 12, load: 1, side: 'L', name: "Row", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, load: 1, side: 'R', name: "Row", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, load: 1, side: 'L', name: "Press", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, load: 1, side: 'R', name: "Press", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, load: 1, side: 'L', name: "Thruster", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, load: 1, side: 'R', name: "Thruster", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null},
      { round: 2, weight: null, load: null, side: null,name: "Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 3, weight: 12, load: 1, side: 'L', name: "Clean & Jerk L", url: null, rep:null, duration: 60, rest: null },
      { round: 3, weight: 12, load: 1, side: 'R', name: "Clean & Jerk R", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 3, weight: 12, load: 1, side: 'LR', name: "H2H Swing", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 120, rest: null },
      { round: 3, weight: 12, load: 1, side: 'L', name: "Snatch L", url: null, rep:null, duration: 120, rest: null },
      { round: 3, weight: 12, load: 1, side: 'R', name: "Snatch R", url: null, rep:null, duration: 120, rest: null }
    ]
  },
  {
    trainingID: 9,
    title: "Make it Lebe Park day workout",
    titleUrl: "https://www.youtube.com/watch?v=RYrATCQJnY0",
    description: "Repeat each subset 10x. If this looks too challenging, adjust it- knock off a rep or use a lower weight.",
    objective: "Warm Up: Suitcase Walk to your favorite spot (switch hands at will)",
    type: null,
    weight: "16kg",
    level: "Intermediate",
    time: "30m",
    rounds: "20",
    reps: null,
    exercises: [
      {round: 1, weight: 16, load: 1, side: 'LR', name: "Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 1, weight: 16, load: 1, side: 'LR', name: "Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 1, weight: 16, load: 1, side: 'LR', name: "Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 1, weight: null, load: null, side: null, name: "Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 2, weight: 16, load: 1, side: 'LR', name: "Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 2, weight: 16, load: 1, side: 'LR', name: "Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 2, weight: 16, load: 1, side: 'LR', name: "Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 2, weight: null, load: null, side: null, name: "Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 3, weight: 16, load: 1, side: 'LR', name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 3, weight: 16, load: 1, side: 'LR', name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 3, weight: 16, load: 1, side: 'LR', name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 3, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 4, weight: 16, load: 1, side: 'LR', name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 4, weight: 16, load: 1, side: 'LR', name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 4, weight: 16, load: 1, side: 'LR', name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 4, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 5, weight: 16, load: 1, side: 'LR', name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 5, weight: 16, load: 1, side: 'LR', name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 5, weight: 16, load: 1, side: 'LR', name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 5, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 6, weight: 16, load: 1, side: 'LR', name: "Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 6, weight: 16, load: 1, side: 'LR', name: "Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 6, weight: 16, load: 1, side: 'LR', name: "Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 6, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 7, weight: 16, load: 1, side: 'LR', name: "Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 7, weight: 16, load: 1, side: 'LR', name: "Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 7, weight: 16, load: 1, side: 'LR', name: "Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 7, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 8, weight: 16, load: 1, side: 'LR', name: "Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 8, weight: 16, load: 1, side: 'LR', name: "Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 8, weight: 16, load: 1, side: 'LR', name: "Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 8, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 9, weight: 16, load: 1, side: 'LR', name: "Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 9, weight: 16, load: 1, side: 'LR', name: "Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 9, weight: 16, load: 1, side: 'LR', name: "Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 9, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 10, weight: 16, load: 1, side: 'LR', name: "Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 10, weight: 16, load: 1, side: 'LR', name: "Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 10, weight: 16, load: 1, side: 'LR', name: "Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 10, weight: null, load: null, side: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 11, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 11, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 11, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 11, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 12, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 12, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 12, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 12, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },
 
      {round: 13, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 13, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 13, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 13, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 14, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 14, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 14, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 14, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 15, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 15, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 15, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 15, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 16, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 16, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 16, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 16, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 17, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 17, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 17, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 17, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 18, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 18, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 18, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 18, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 19, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 19, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 19, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 19, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null },

      {round: 20, weight: 16, load: 1, side: 'LR', name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 20, weight: 16, load: 1, side: 'LR', name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 20, weight: 16, load: 1, side: 'LR', name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 20, weight: null, load: null, side: null, name: "Rest", url: null, rep:null, duration: 60, rest: null }
    ],
    finisher: "25x Military Burpees.", finisherweight: null, finisherrep:25, finisherduration: null, finisherrest: null 
  },
  {
    trainingID: 10,
    title: "Build muscle, lose the fat workout",
    titleUrl: "https://www.youtube.com/watch?v=-M1MGrzVp8A",
    description: "2x Part 1, 3x Part 2 ",
    objective: "Warm Up: Suitcase Walk to your favorite spot (switch hands at will)",
    type: null,
    weight: "16kg",
    level: "Intermediate",
    time: "20m",
    rounds: "5",
    reps: null,
    exercises: [
      { round: 1, weight: 16, load: 1, side: 'LR', name: "Snatches per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: null  },
      { round: 1, weight: 16, load: 1, side: 'L', name: "Renegade rows superset", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:6, duration: null, rest: null  },
      { round: 1, weight: 16, load: 1, side: 'L', name: "Farmers carry", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null  },
      { round: 1, weight: 16, load: 1, side: 'LR', name: "High pulls per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  },
      { round: 1, weight: 16, load: 1, side: 'LR', name: "Swings per side superset", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: null  },

      { round: 2, weight: 16, load: 1, side: 'LR', name: "Snatches per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: null  },
      { round: 2, weight: 16, load: 1, side: 'R', name: "Renegade rows superset", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:6, duration: null, rest: null  },
      { round: 2, weight: 16, load: 1, side: 'R', name: "Farmers carry", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null  },
      { round: 2, weight: 16, load: 1, side: 'LR', name: "High pulls per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  },
      { round: 2, weight: 16, load: 1, side: 'LR', name: "Swings per side superset", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: null  },

      { round: 3, weight: 16, load: 1, side: 'L', name: "Snatch", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:15, duration: null, rest: null  },
      { round: 3, weight: 16, load: 1, side: 'R', name: "Snatch", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:15, duration: null, rest: null  },
      { round: 3, weight: 16, load: 1, side: 'LR', name: "Renegade rows (EMOM)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  },

      { round: 4, weight: 16, load: 1, side: 'L', name: "Snatch", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:15, duration: null, rest: null },
      { round: 4, weight: 16, load: 1, side: 'R', name: "Snatches", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:15, duration: null, rest: null },
      { round: 4, weight: 16, load: 1, side: 'LR', name: "Renegade rows (EMOM)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  },

      { round: 5, weight: 16, load: 1, side: 'L', name: "Snatches", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:15, duration: null, rest: null },
      { round: 5, weight: 16, load: 1, side: 'R', name: "Snatches", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:15, duration: null, rest: null  },
      { round: 5, weight: 16, load: 1, side: 'LR', name: "Renegade rows (EMOM)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  }
    ]
  }
];

/* ============================================================
   GLOBALS
============================================================ */
let wakeLock = null;
let audioCtx = null;
let scrollY = 0;

/* ============================================================
   GUIDED STATE
============================================================ */
const guidedState = {
  active: false,
  paused: false,
  currentWorkoutIndex: 0,
  steps: [],          // { type: 'work'|'rest', name, url, round, duration, weight, reps }
  currentStepIndex: 0,
  remainingSeconds: 0,
  timerId: null,
  isPrep: false       // true during 7s pre-start countdown
};

/* ============================================================
   EXERCISE LIST MODULE (REUSED: NORMAL + GUIDED)
============================================================ */
const ExerciseListModule = (() => {
  let container = null;

  function init(target) {
    container = target;
  }

  function render(workout) {
    if (!container || !workout || !workout.exercises) return;

    const getWeightClass = (weight) => {
      return weight ? `weight-${weight}` : "";
    };

    const getSideClasses = (ex) => {
      let sideL = "";
      let sideR = "";

      if (ex.load === 1 && ex.side === "L") sideL = "filled";
      else if (ex.load === 1 && ex.side === "R") sideR = "filled";
      else if (ex.load === 1 && ex.side === "LR") {
        sideL = "half-diag";
        sideR = "half-diag";
      } else if (ex.load === 2 && ex.side === "LR") {
        sideL = "filled";
        sideR = "filled";
      }

      return { sideL, sideR };
    };

    const html = workout.exercises.map((ex, idx) => {
      const { sideL, sideR } = getSideClasses(ex);
      const weightClass = getWeightClass(ex.weight);
      const rep = ex.rep ? `${ex.rep}x` : "";

      return `
        <li class="exercise-item flight-row ${weightClass}">
          <!-- ROUND -->
          <span class="exercise-round">R: ${ex.round}</span>

          <!-- EXERCISE COUNTER -->
          <span class="exercise-time">E: ${idx + 1}</span>

          <!-- LEFT SIDE -->
          <span class="sideL ${sideL} ${weightClass}" data-side="L"></span>

          <!-- RIGHT SIDE -->
          <span class="sideR ${sideR} ${weightClass}" data-side="R"></span>

          <!-- REP INDICATOR -->
          <span class="exercise-rep">${rep}</span>

          <!-- DESCRIPTION -->
          <span class="exercise-desc">
            ${
              ex.url
                ? `<a href="${ex.url}" target="_blank" rel="noopener noreferrer">${ex.name}</a>`
                : ex.name
            }
          </span>
        </li>
      `;
    }).join("");

    container.innerHTML = `<ul class="exercise-list">${html}</ul>`;
  }

  // ✅ New logic: do NOT try to track done items by index.
  // The list is already being pruned (completed exercise removed),
  // so the FIRST remaining item is always the current exercise.
  function syncHighlight() {
    const items = document.querySelectorAll('.exercise-item');
    if (!items.length) return;

    items.forEach((li) => {
      li.classList.remove('active', 'done');
      li.style.color = '';
    });

    const first = items[0];
    if (first) {
      first.classList.add('active');
    }
  }

  return { init, render, syncHighlight };
})();

/* ============================================================
   NORMAL WORKOUT DISPLAY
============================================================ */
function showWorkout(index) {
  const i = Math.max(0, Math.min(workouts.length - 1, index - 1));
  const w = workouts[i];
  if (!w) return;

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
        <div class="meta-item">
          <span class="meta-label">Objective:</span>
          <span class="meta-value">${w.objective ?? ""}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Level:</span>
          <span class="meta-value">${w.level || "N/A"}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Weight:</span>
          <span class="meta-value">${w.weight ?? "N/A"}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Time:</span>
          <span class="meta-value">${w.time || "N/A"}</span>
        </div>
      </div>

      ${
        w.finisher
          ? `
        <div class="workout-meta aligned bordered finisher">
          <div class="meta-item">
            <span class="meta-label">Finisher:</span>
            <span class="meta-value">${w.finisher}</span>
          </div>
        </div>`
          : ""
      }

      <div id="exercise-list-container"></div>
    </div>
  `;

  const listContainer = document.getElementById('exercise-list-container');
  ExerciseListModule.init(listContainer);
  ExerciseListModule.render(w);
}

/* ============================================================
   WAKE LOCK
============================================================ */
// Prevent screen dimming / sleep while the page is open
// ✅ HARD LOCK: KEEP SCREEN AWAKE
async function enableWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('✅ Wake Lock active');

      wakeLock.addEventListener('release', () => {
        console.log('⚠️ Wake Lock released');
      });

      // ✅ Auto-reacquire on visibility change
      document.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible') {
          try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('✅ Wake Lock re-acquired');
          } catch (err) {
            console.warn('Wake Lock re-acquire failed:', err);
          }
        }
      });

    } else {
      console.warn('⚠️ Wake Lock API not supported — using iOS fallback');
      enableIOSNoSleepFallback();
    }
  } catch (err) {
    console.error('Wake Lock Error:', err);
  }
}

// ✅ iOS SAFARI FALLBACK (NO WAKE LOCK API SUPPORT)
function enableIOSNoSleepFallback() {
  const video = document.createElement('video');

  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.style.position = 'fixed';
  video.style.opacity = '0';
  video.style.pointerEvents = 'none';
  video.style.width = '1px';
  video.style.height = '1px';

  // ✅ 1-frame silent video keeps iOS awake
  video.src =
    "data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDFtcDQxaXNvbTQyAAAAAG1kYXQhEAUgoKGgoKGgoKGgoKGgoKGgoKGgoKGgoKGgoKGgoKGgoKGgoA==";

  document.body.appendChild(video);

  video.play().catch(() => {
    console.warn("⚠️ iOS autoplay blocked — waiting for user interaction");
  });

  console.log('✅ iOS No-Sleep fallback active');
}

// ✅ RELEASE (only if you ever intentionally want it off)
async function disableWakeLock() {
  try {
    if (wakeLock) {
      await wakeLock.release();
      wakeLock = null;
      console.log('✅ Wake Lock released');
    }
  } catch (err) {
    console.warn('Wake Lock release failed:', err);
  }
}

/* ============================================================
   AUDIO + VIBRATION
============================================================ */
function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
}

function playTone(freq = 880, duration = 0.2, volume = 0.25) {
  try {
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    console.warn('Tone failed:', err);
  }
}

function playBeep() {
  playTone(880, 0.2, 0.2);
}

function playStartBeep() {
  playTone(700, 0.25, 0.25);
}

// Utility: vibration
function vibratePattern() {
  if ('vibrate' in navigator) {
    navigator.vibrate([100, 80, 100]);
  }
}

/* ============================================================
   SCROLL LOCK (OVERLAY)
============================================================ */
function lockScroll() {
  scrollY = window.scrollY;
  document.body.style.top = `-${scrollY}px`;
  document.body.classList.add('guided-active');
}

function unlockScroll() {
  document.body.classList.remove('guided-active');
  document.body.style.top = '';
  window.scrollTo(0, scrollY);
}

/* ============================================================
   TIME & DISPLAY HELPERS
============================================================ */
// Utility: format seconds as MM:SS
function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

function handleFinalCountdownBeep(remaining) {
  if (remaining === 3 || remaining === 2 || remaining === 1) {
    playBeep();
    vibratePattern();
  }
}

// Compute round + exercise index among WORK steps
function computeExerciseProgress() {
  const steps = guidedState.steps;
  const idx = guidedState.currentStepIndex;

  if (!steps || steps.length === 0) {
    return { round: null, current: 0, total: 0 };
  }

  // total number of exercises = count of "work" steps
  let total = 0;
  steps.forEach(s => {
    if (s.type === 'work') total++;
  });

  // current exercise number = number of WORK steps up to current index
  let current = 0;
  const safeIndex = Math.min(idx, steps.length - 1);
  for (let i = 0; i <= safeIndex; i++) {
    if (steps[i].type === 'work') current++;
  }

  const currentStep = steps[safeIndex];
  const round = currentStep && currentStep.round != null ? currentStep.round : null;

  return { round, current, total };
}

// Update timer text: R: X | E: A/B | MM:SS
function updateGuidedTimerDisplay() {
  const steps = guidedState.steps || [];

  if (!steps.length) {
    guidedTimer.innerHTML = 'R: - | E: -/- | 00:00<br>C: - | N: —';
    return;
  }

  const time = formatTime(guidedState.remainingSeconds);

  // ===== TOTAL EXERCISES (only WORK steps) =====
  let totalWork = 0;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].type === 'work') totalWork++;
  }

  // ===== FIND CURRENT EXERCISE (work-centric) =====
  let currentWorkIndex = -1; // index in steps[] of the current exercise
  let logicalIndex = guidedState.currentStepIndex;

  if (logicalIndex < 0) logicalIndex = 0;
  if (logicalIndex >= steps.length) logicalIndex = steps.length - 1;

  const logicalStep = steps[logicalIndex];

  if (guidedState.isPrep) {
    // During prep we are before the first exercise
    currentWorkIndex = -1;
  } else if (logicalStep && logicalStep.type === 'work') {
    // We are on a work step
    currentWorkIndex = logicalIndex;
  } else {
    // We are on a rest / other step: show the last work step as "current"
    for (let i = logicalIndex - 1; i >= 0; i--) {
      if (steps[i].type === 'work') {
        currentWorkIndex = i;
        break;
      }
    }
  }

  // ===== DETERMINE CURRENT EXERCISE NAME & NUMBER =====
  let currentName = '—';
  let currentNumber = 0;
  let round = null;

  if (guidedState.isPrep) {
    currentName = 'Get Ready';
    currentNumber = 0;
  } else if (currentWorkIndex >= 0) {
    const currentStep = steps[currentWorkIndex];
    currentName = currentStep.name || '—';
    round = currentStep.round != null ? currentStep.round : null;

    // Count how many work steps are up to and including currentWorkIndex
    let count = 0;
    for (let i = 0; i <= currentWorkIndex; i++) {
      if (steps[i].type === 'work') count++;
    }
    currentNumber = count;
  } else {
    // We haven't started the first exercise yet (after prep but before first work)
    currentName = '—';
    currentNumber = 0;
  }

  // ===== FIND NEXT EXERCISE (next WORK step) =====
  let nextWorkStep = null;
  if (guidedState.isPrep) {
    // Next after prep is the first work step
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].type === 'work') {
        nextWorkStep = steps[i];
        break;
      }
    }
  } else if (currentWorkIndex >= 0) {
    for (let i = currentWorkIndex + 1; i < steps.length; i++) {
      if (steps[i].type === 'work') {
        nextWorkStep = steps[i];
        break;
      }
    }
  }

  const nextName = nextWorkStep ? nextWorkStep.name : '—';

  // ===== ROUND / EXERCISE STRING =====
  if (round == null && nextWorkStep && nextWorkStep.round != null) {
    round = nextWorkStep.round;
  }
  const rStr = round != null ? round : '-';
  const eStr = totalWork > 0 ? `${currentNumber}/${totalWork}` : '-/-';

  // ===== RENDER (multiline) =====
  guidedTimer.innerHTML =
    `R: ${rStr} | E: ${eStr} | ${time}<br>` +
    `C: ${currentName} | N: ${nextName}`;
}

function updateProgressBar() {
  const bar = document.getElementById('guided-progress-bar');
  if (!bar) return;

  const step = guidedState.steps[guidedState.currentStepIndex];

  // PREP or no step → neutral
  if (!step || guidedState.isPrep) {
    bar.style.width = '0%';
    bar.style.background = '#F4F4F4';
    return;
  }

  const percent = 100 - (guidedState.remainingSeconds / step.duration) * 100;
  bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;

  // REST → force neutral color
  if (step.type === 'rest') {
    bar.style.background = '#F6F7FB';
    return;
  }

  // WORK → use active exercise highlight color
  const active = document.querySelector('.exercise-item.active .exercise-desc');
  if (active) {
    bar.style.background = getComputedStyle(active).backgroundColor;
  } else {
    bar.style.background = '#F6F7FB';
  }
}

function syncExerciseHighlight() {
  const items = document.querySelectorAll('.exercise-item');
  if (!items.length) return;

  const step = guidedState.steps[guidedState.currentStepIndex];

  // ✅ CLEAR ALL STATES FIRST
  items.forEach(li => {
    li.classList.remove('active');
    li.style.color = '';
  });

  // ✅ IF CURRENT STEP IS REST → DO NOT HIGHLIGHT ANYTHING
  if (!step || step.type === 'rest') {
    return;
  }

  // ✅ CURRENT STEP IS WORK → HIGHLIGHT FIRST REMAINING ITEM ONLY
  const first = items[0];
  if (first) {
    first.classList.add('active');
  }
}

/* ============================================================
   BUILD GUIDED STEPS FROM WORKOUT
============================================================ */
function buildGuidedSteps(workout) {
  const steps = [];

  workout.exercises.forEach((ex) => {
    const workDuration = ex.duration != null ? ex.duration : 60; // default 60s if missing
    // Work step
    steps.push({
      type: 'work',
      name: ex.name,
      url: ex.url || null,
      round: ex.round || null,
      weight: ex.weight || null,
      reps: ex.rep || null,
      duration: workDuration
    });

    const restDuration = ex.rest != null ? ex.rest : 0;
    if (restDuration > 0) {
      steps.push({
        type: 'rest',
        name: 'Rest',
        url: null,
        round: ex.round || null,
        weight: null,
        reps: null,
        duration: restDuration
      });
    }
  });

  // Optional finisher as a final step if it has duration
  if (workout.finisher && workout.duration) {
    const finDur = workout.duration || 60;
    steps.push({
      type: 'work',
      name: `Finisher: ${workout.finisher}`,
      url: null,
      round: null,
      weight: null,
      reps: null,
      duration: finDur
    });
  }

  return steps;
}

/* ============================================================
   STEP TIMER WITH PREP + BEEPS + PROGRESS
============================================================ */
function startStepTimer() {
  clearInterval(guidedState.timerId);

  // PREP MODE (7s countdown)
  if (guidedState.isPrep) {
    updateGuidedTimerDisplay();
    updateProgressBar();

    guidedState.timerId = setInterval(() => {
      if (guidedState.paused) return;

      guidedState.remainingSeconds -= 1;
      updateGuidedTimerDisplay();
      updateProgressBar();

      // 3-2-1 beeps during prep
      handleFinalCountdownBeep(guidedState.remainingSeconds);

      if (guidedState.remainingSeconds <= 0) {
        clearInterval(guidedState.timerId);

        guidedState.isPrep = false;
        guidedState.remainingSeconds = 0;

        // Start first real exercise with start tone
        playStartBeep();
        startStepTimer();
      }
    }, 1000);

    return;
  }

  // NORMAL MODE (Work/Rest)
  const current = guidedState.steps[guidedState.currentStepIndex];

  // Workout finished
  if (!current) {
    guidedState.remainingSeconds = 0;
    updateGuidedTimerDisplay();
    updateProgressBar();
    syncExerciseHighlight();
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    guidedState.paused = false;
    playBeep();
    vibratePattern();
    return;
  }

  // New step start (set duration + play start tone if WORK)
  if (!guidedState.remainingSeconds || guidedState.remainingSeconds <= 0) {
    guidedState.remainingSeconds = current.duration;

    if (current.type === 'work') {
      playStartBeep();
    }
  }

  updateGuidedTimerDisplay();
  updateProgressBar();
  syncExerciseHighlight();

  guidedState.timerId = setInterval(() => {
    if (guidedState.paused) return;

    guidedState.remainingSeconds -= 1;
    updateGuidedTimerDisplay();
    updateProgressBar();
    syncExerciseHighlight();

    const step = guidedState.steps[guidedState.currentStepIndex];
    const half = Math.floor(step.duration / 2);

    // Halfway beep
    if (guidedState.remainingSeconds === half) {
      playBeep();
      vibratePattern();
    }

    // Final 3-2-1 beeps
    handleFinalCountdownBeep(guidedState.remainingSeconds);

    if (guidedState.remainingSeconds <= 0) {
    clearInterval(guidedState.timerId);
    playBeep();
    vibratePattern();

    const finishedStep =
        guidedState.steps[guidedState.currentStepIndex];

    // ✅ REMOVE COMPLETED WORK EXERCISE FROM LIST
    if (finishedStep?.type === 'work') {
        removeCompletedExerciseFromGuidedList();
    }

    guidedState.currentStepIndex += 1;
    guidedState.remainingSeconds = 0;
    startStepTimer();
    }
  }, 1000);
}

/* ============================================================
   GUIDED WORKOUT: START / STOP / PAUSE
============================================================ */
function startGuidedWorkout() {
  if (!workouts.length) return;

  const currentIndex = Math.max(
    1,
    Math.min(workouts.length, parseInt(numberInput.value, 10) || 1)
  ) - 1;

  const workout = workouts[currentIndex];
  if (!workout) return;

  // ✅ FORCE WAKE LOCK ON EVERY START
  enableWakeLock();

  guidedState.active = true;
  guidedState.paused = false;
  guidedState.currentWorkoutIndex = currentIndex;
  guidedState.steps = buildGuidedSteps(workout);
  guidedState.currentStepIndex = 0;

  // ✅ 7-second PREP countdown
  guidedState.remainingSeconds = 7;
  guidedState.isPrep = true;

  display.style.display = 'none';

  const wrapper = document.querySelector('.guided-list-wrapper');
  if (wrapper) {
    wrapper.style.overflow = 'visible';
    wrapper.style.maxHeight = 'none';
  }

  if (guidedList) {
    ExerciseListModule.init(guidedList);
    ExerciseListModule.render(workout);
  }

  lockScroll();
  guidedContainer.classList.remove('hidden');

  pauseBtn.disabled = false;
  pauseBtn.textContent = 'Pause';

  updateGuidedTimerDisplay();
  updateProgressBar();
  startStepTimer();
}

function removeCompletedExerciseFromGuidedList() {
  const items = guidedList.querySelectorAll('.exercise-item');
  if (!items.length) return;

  // Remove the FIRST item only (represents completed work step)
  const first = items[0];
  if (first) {
    first.remove();
  }
}

// Stop/clear guided workout state (used when changing workouts or leaving)
function stopGuidedWorkout() {
  clearInterval(guidedState.timerId);
  guidedState.active = false;
  guidedState.paused = false;
  guidedState.steps = [];
  guidedState.currentStepIndex = 0;
  guidedState.remainingSeconds = 0;
  guidedState.isPrep = false;

  updateGuidedTimerDisplay();
  updateProgressBar();

  if (guidedList) {
    guidedList.innerHTML = '';
  }

  pauseBtn.disabled = true;
  pauseBtn.textContent = 'Pause';

  /* ✅✅✅ NEW: RESTORE NORMAL WORKOUT SCREEN */
  display.style.display = '';

  /* ✅✅✅ OPTIONAL: RESTORE SCROLL SAFETY (IN CASE USER RESIZES) */
  const wrapper = document.querySelector('.guided-list-wrapper');
  if (wrapper) {
    wrapper.style.overflow = '';
    wrapper.style.maxHeight = '';
  }

  unlockScroll();
  guidedContainer.classList.add('hidden');
}

// Toggle pause / resume
function togglePause() {
  if (!guidedState.active || guidedState.steps.length === 0) return;

  guidedState.paused = !guidedState.paused;

  if (guidedState.paused) {
    pauseBtn.textContent = 'Resume';
  } else {
    pauseBtn.textContent = 'Pause';
  }
}

/* ============================================================
   CONTROLS + INIT
============================================================ */
function updateControls(value) {
  if (!workouts.length) return;

  const val = Math.max(1, Math.min(parseInt(value, 10) || 1, workouts.length));
  slider.value = val;
  numberInput.value = val;
  showWorkout(val);

  // If user changes workout while guided is running, reset guided mode
  if (guidedState.active) {
    stopGuidedWorkout();
  }
}

function initControls() {
  if (!workouts.length) return;

  slider.min = 1;
  slider.max = workouts.length;
  slider.value = 1;

  numberInput.min = 1;
  numberInput.max = workouts.length;
  numberInput.value = 1;

  // Enable screen wake lock on load
  enableWakeLock();

  // Initial workout display (#1)
  showWorkout(1);
}

/* ============================================================
   EVENT LISTENERS
============================================================ */
document.addEventListener('touchstart', initAudio, { once: true });
document.addEventListener('click', initAudio, { once: true });
document.addEventListener("DOMContentLoaded", enableWakeLock);

slider.addEventListener("input", e => updateControls(e.target.value));
numberInput.addEventListener("change", e => updateControls(e.target.value));
plusBtn.addEventListener("click", () => updateControls(Number(numberInput.value) + 1));
minusBtn.addEventListener("click", () => updateControls(Number(numberInput.value) - 1));
generateBtn.addEventListener("click", () =>
  updateControls(Math.floor(Math.random() * workouts.length) + 1)
);

startGuidedBtn.addEventListener("click", () => {
  startGuidedWorkout();
});

pauseBtn.addEventListener("click", () => {
  togglePause();
});

/* ============================================================
   INIT
============================================================ */
initControls();
