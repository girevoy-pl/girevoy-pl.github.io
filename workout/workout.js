const display = document.getElementById('workout-display');
const slider = document.getElementById('workout-slider');
const numberInput = document.getElementById('workout-number');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const generateBtn = document.getElementById('generate-btn');

const startGuidedBtn = document.getElementById('start-guided-btn');
const pauseBtn = document.getElementById('pause-btn');
const guidedContainer = document.getElementById('guided-container');
const guidedList = document.getElementById('guided-list');
const guidedTimer = document.getElementById('guided-timer');
const guidedListWrapper = document.getElementById('guided-list-wrapper');

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
      { round: 1, weight: 20, name: "Hang Row L", url: "https://www.youtube.com/watch?v=example_row", rep:null, duration: 60, rest: 30  },
      { round: 1, weight: 20, name: "Jerk L", url: "https://www.youtube.com/watch?v=example_jerk", rep:null, duration: 60, rest: 30  },
      { round: 1, weight: 20, name: "Half Snatch L", url: "https://www.youtube.com/watch?v=example_snatch", rep:null, duration: 60, rest: 30 },
      //{ round: 1, weight: null, name: "Switch Sides", url: null, rep:null, duration: 5, rest: 0 },
      { round: 2, weight: 20, name: "Alt. Clean & Jerk", url: "https://www.youtube.com/watch?v=example_cleanjerk", rep:null, duration: 60, rest: 30 },

      { round: 2, weight: 20, name: "Hang Row L", url: "https://www.youtube.com/watch?v=example_row", rep:null, duration: 60, rest: 30  },
      { round: 2, weight: 20, name: "Jerk L", url: "https://www.youtube.com/watch?v=example_jerk", rep:null, duration: 60, rest: 30  },
      { round: 2, weight: 20, name: "Half Snatch L", url: "https://www.youtube.com/watch?v=example_snatch", rep:null, duration: 60, rest: 30 },
      //{ round: 2, weight: null, name: "Switch Sides", url: null, rep:null, duration: 5, rest: 0 },
      { round: 3, weight: 20, name: "Alt. Clean & Jerk", url: "https://www.youtube.com/watch?v=example_cleanjerk", rep:null, duration: 60, rest: 30 },

      { round: 3, weight: 20, name: "Hang Row L", url: "https://www.youtube.com/watch?v=example_row", rep:null, duration: 60, rest: 30  },
      { round: 3, weight: 20, name: "Jerk L", url: "https://www.youtube.com/watch?v=example_jerk", rep:null, duration: 60, rest: 30  },
      { round: 3, weight: 20, name: "Half Snatch L", url: "https://www.youtube.com/watch?v=example_snatch", rep:null, duration: 60, rest: 30 },
      //{ round: 3, weight: null, name: "Switch Sides", url: null, rep:null, duration: 5, rest: 0 },
      { round: 4, weight: 20, name: "Alt. Clean & Jerk", url: "https://www.youtube.com/watch?v=example_cleanjerk", rep:null, duration: 60, rest: 30 },

      { round: 4, weight: 20, name: "Hang Row L", url: "https://www.youtube.com/watch?v=example_row", rep:null, duration: 60, rest: 30  },
      { round: 4, weight: 20, name: "Jerk L", url: "https://www.youtube.com/watch?v=example_jerk", rep:null, duration: 60, rest: 30  },
      { round: 4, weight: 20, name: "Half Snatch L", url: "https://www.youtube.com/watch?v=example_snatch", rep:null, duration: 60, rest: 30 },
      //{ round: 4, weight: null, name: "Switch Sides", url: null, rep:null, duration: 5, rest: 0 },
      { round: 4, weight: 20, name: "Alt. Clean & Jerk", url: "https://www.youtube.com/watch?v=example_cleanjerk", rep:null, duration: 60, rest: 30 }
    ],
    finisher: "Heavy suitcase carry, 1 min per side", finisherweight:null, finisherrep: null, finisherduration: 60, finisherrest: 0
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
      { round: 1, weight: 12, name: "10rep - SH Deadlift per side", url: "https://www.youtube.com/watch?v=example_deadlift", rep: 10, duration: 60, rest: 5 },
      { round: 1, weight: 12, name: "10rep - Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep: 10, duration: 60, rest: 5 },
      { round: 1, weight: 12, name: "10rep - Swing", url: "https://www.youtube.com/watch?v=example_swing", rep: 10, duration: 60, rest: 5 },
      { round: 1, weight: 12, name: "10rep - Push Up / Modified Burpee", url: "https://www.youtube.com/watch?v=example_pushup", rep: 10, duration: 60, rest: 5 },
      { round: 1, weight: 12, name: "1min  - Rest", url: null, rep: null, duration: 0, rest: 60 },

      { round: 2, weight: 12, name: "10rep - SH Deadlift per side", url: "https://www.youtube.com/watch?v=example_deadlift", rep: 10, duration: 60, rest: 5 },
      { round: 2, weight: 12, name: "10rep - Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep: 10, duration: 60, rest: 5 },
      { round: 2, weight: 12, name: "10rep - Swing", url: "https://www.youtube.com/watch?v=example_swing", rep: 10, duration: 60, rest: 5 },
      { round: 2, weight: 12, name: "10rep - Push Up / Modified Burpee", url: "https://www.youtube.com/watch?v=example_pushup", rep: 10, duration: 60, rest: 5 },
      { round: 2, weight: 12, name: "1min  - Rest", url: null, rep: null, duration: 0, rest: 60 }

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
      { round: 1, weight: 16, name: "2 min - Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 120, rest: 3 },
      { round: 1, weight: 16, name: "1 min - Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 3 },
      { round: 1, weight: 16, name: "1 min - Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 3 },
      { round: 1, weight: 16, name: "1 min - Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 3 },
      { round: 1, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 3 },
      { round: 1, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 2, weight: 16, name: "2 min - Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 120, rest: 3 },
      { round: 2, weight: 16, name: "1 min - Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 3 },
      { round: 2, weight: 16, name: "1 min - Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 3 },
      { round: 2, weight: 16, name: "1 min - Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 3 },
      { round: 2, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 3 },
      { round: 2, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 3, weight: 16, name: "2 min - Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 120, rest: 3 },
      { round: 3, weight: 16, name: "1 min - Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 3 },
      { round: 3, weight: 16, name: "1 min - Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 3 },
      { round: 3, weight: 16, name: "1 min - Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 3 },
      { round: 3, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 3 },
      { round: 3, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 4, weight: 16, name: "2 min - Goblet Squat", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 120, rest: 3 },
      { round: 4, weight: 16, name: "1 min - Clean & Jerk (left)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 3 },
      { round: 4, weight: 16, name: "1 min - Clean & Jerk (right)", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 3 },
      { round: 4, weight: 16, name: "1 min - Snatch (left)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 3 },
      { round: 4, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 3 },
      { round: 4, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: 0 }
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
      { round:1, weight: 16, name: "Round 1 - 10rep - Deadlift (Left)", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: 0 },
      { round:1, weight: 16, name: "Round 1 - 10rep - Deadlift (Right)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: 0 },
      { round:1, weight: 16, name: "Round 1 - 10rep - Goblet Squat", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:10, duration: null, rest: 0 },
      { round:1, weight: 16, name: "Round 1 - 10rep - Double Hand Swing", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:10, duration: null, rest: 0 },
      { round:1, weight: 16, name: "Round 1 - 10rep - Push Up", url: "https://www.youtube.com/watch?v=example_snatchright", rep:10, duration: null, rest: 0 },
      { round:1, weight: null, name: "Round 1 - 1 min   - Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round:2, weight: 16, name: "Round 2 - 10rep - Deadlift (Left)", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: 0 },
      { round:2, weight: 16, name: "Round 2 - 10rep - Deadlift (Right)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: 0 },
      { round:2, weight: 16, name: "Round 2 - 10rep - Goblet Squat", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:10, duration: null, rest: 0 },
      { round:2, weight: 16, name: "Round 2 - 10rep - Double Hand Swing", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:10, duration: null, rest: 0 },
      { round:2, weight: 16, name: "Round 2 - 5rep - Burpee", url: "https://www.youtube.com/watch?v=example_snatchright", rep:5, duration: null, rest: 0 },
      { round:2, weight: null, name: "Round 2 - 1 min   - Rest", url: null, rep:null, duration: 60, rest: 0 }
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
      { round: 1, weight: 16, name: "2 mmin - Power Clean", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: 5 },
      { round: 1, weight: 16, name: "2x - 10reps - DH Swing", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 5 },
      { round: 1, weight: 16, name: "2 min - Power Clean, Squat & DH Press Flow", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 5 },
      { round: 1, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 2, weight: 16, name: "2 min - Power Clean", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 5 },
      { round: 2, weight: 16, name: "2x 15rep - DH Swing", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 5 },
      { round: 2, weight: 16, name: "2 min - Power Clean, Squat & DH Press Flow", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: 5 },
      { round: 2, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: 0 },

      { round: 3, weight: 16, name: "1 min - Clean (Left)", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: 5 },
      { round: 3, weight: 16, name: "1 min - Clean (Right)", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: 5 },
      { round: 3, weight: 16, name: "2 min - H2H Swing", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 120, rest: 5 },
      { round: 3, weight: 16, name: "1 min - Clean Left, Rack Squat & Press Flow ", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: 5 },
      { round: 3, weight: 16, name: "1 min - Clean Right, Rack Squat & Press Flow", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: 5 },
      { round: 3, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: 0 }
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
      { round: 1, weight: 16, name: "3rep - Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 1, weight: 16, name: "3rep - Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 1, weight: 16, name: "3rep - Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 1, weight: 16, name: "3rep - Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 1, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 1, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 2, weight: 16, name: "3rep - Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 2, weight: 16, name: "3rep - Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 2, weight: 16, name: "3rep - Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 2, weight: 16, name: "3rep - Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 2, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 2, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 3, weight: 16, name: "3rep - Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 3, weight: 16, name: "3rep - Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 3, weight: 16, name: "3rep - Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 3, weight: 16, name: "3rep - Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 3, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright" , rep:null, duration: 60, rest: null},
      { round: 3, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 4, weight: 16, name: "3rep - Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 4, weight: 16, name: "3rep - Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 4, weight: 16, name: "3rep - Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 4, weight: 16, name: "3rep - Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 4, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 4, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 5, weight: 16, name: "3rep - Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 5, weight: 16, name: "3rep - Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 5, weight: 16, name: "3rep - Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 5, weight: 16, name: "3rep - Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 5, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 5, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: null },

      { round: 6, weight: 16, name: "3rep - Reverse Lunge/side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 6, weight: 16, name: "3rep - Row per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 6, weight: 16, name: "3rep - Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 6, weight: 16, name: "3rep - Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 6, weight: 16, name: "1 min - Snatch (right)", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },
      { round: 6, weight: null, name: "1 min - Rest", url: null, rep:null, duration: 60, rest: null }
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
      { round: 1, weight: 16, name: "Superset 1 - 10x16kg - Jerk + Pull Up", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: null },
      { round: 1, weight: 20, name: "Superset 1 - 8x20kg  - Jerk + Pull Up", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:8, duration: null, rest: null },
      { round: 1, weight: 24, name: "Superset 1 - 6x24kg  - Jerk + Pull Up", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:6, duration: null, rest: null },

      { round: 2, weight: 16, name: "Superset 2 - 10x16kg - Half Snatch + Deficit Push Up", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: null },
      { round: 2, weight: 20, name: "Superset 2 - 8x20kg  - Half Snatch + Deficit Push Up", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:8, duration: null, rest: null },
      { round: 2, weight: 24, name: "Superset 2 - 6x24kg  - Half Snatch + Deficit Push Up", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:6, duration: null, rest: null },

      { round: 3, weight: 16, name: "Superset 3 - 10x16kg - Renegade Row + Dips", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:10, duration: null, rest: null },
      { round: 3, weight: 20, name: "Superset 3 - 8x20kg  - Renegade Row + Dips", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:8, duration: null, rest: null },
      { round: 3, weight: 24, name: "Superset 3 - 6x24kg  - Renegade Row + Dips", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:6, duration: null, rest: null },

      { round: 4, weight: 16, name: "Superset 4 - 10x16kg - Snatch + Burpee", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:10, duration: null, rest: null },
      { round: 4, weight: 20, name: "Superset 4 - 8x20kg  - Snatch + Burpee", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:8, duration: null, rest: null },
      { round: 4, weight: 24, name: "Superset 4 - 6x24kg  - Snatch + Burpee", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:6, duration: null, rest: null }
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
      { round: 1, weight: 12, name: "1 min - Row L", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, name: "1 min - Row R", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, name: "1 min - Press L", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, name: "1 min - Press R", url: null, rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, name: "1 min - Thruster L", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 1, weight: 12, name: "1 min - Thruster R", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null },

      { round: 2, weight: 12, name: "1 min - Row L", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, name: "1 min - Row R", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, name: "1 min - Press L", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, name: "1 min - Press R", url: null, rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, name: "1 min - Thruster L", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
      { round: 2, weight: 12, name: "1 min - Thruster R", url: "https://www.youtube.com/watch?v=example_snatchright", rep:null, duration: 60, rest: null},

      { round: 2, weight: null, name: "Rest", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:null, duration: 60, rest: null },

      { round: 3, weight: 12, name: "1 min - Clean & Jerk L", url: null, rep:null, duration: 60, rest: null },
      { round: 3, weight: 12, name: "1 min - Clean & Jerk R", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null },
      { round: 3, weight: 12, name: "2 min - H2H Swing", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:null, duration: 120, rest: null },
      { round: 3, weight: 12, name: "2 min - Snatch L", url: null, rep:null, duration: 120, rest: null },
      { round: 3, weight: 12, name: "2 min - Snatch R", url: null, rep:null, duration: 120, rest: null }
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
      {round: 1, weight: 16, name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 1, weight: 16, name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 1, weight: 16, name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 1, weight: null, name: "1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 2, weight: 16, name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 2, weight: 16, name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 2, weight: 16, name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 2, weight: null, name: "1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 3, weight: 16, name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 3, weight: 16, name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 3, weight: 16, name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 3, weight: null, name: "1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 4, weight: 16, name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 4, weight: 16, name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 4, weight: 16, name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 4, weight: null, name: "1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 5, weight: 16, name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 5, weight: 16, name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 5, weight: 16, name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 5, weight: null, name: "1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 6, weight: 16, name: "Superset 1 - 3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 6, weight: 16, name: "Superset 1 - 3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 6, weight: 16, name: "Superset 1 - 3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 6, weight: null, name: "Superset 1 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 7, weight: 16, name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 7, weight: 16, name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 7, weight: 16, name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 7, weight: null, name: "1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 8, weight: 16, name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 8, weight: 16, name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 8, weight: 16, name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 8, weight: null, name: "1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 9, weight: 16, name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 9, weight: 16, name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 9, weight: 16, name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 9, weight: null, name: "1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 10, weight: 16, name: "3rep - Clean & Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 10, weight: 16, name: "3rep - Jerk per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 10, weight: 16, name: "3rep - Snatch per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:3, duration: null, rest: null },
      {round: 10, weight: null, name: "1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 11, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 11, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 11, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 11, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 12, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 12, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 12, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 12, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },
 
      {round: 13, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 13, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 13, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 13, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 14, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 14, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 14, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 14, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 15, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 15, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 15, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 15, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 16, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 16, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 16, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 16, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 17, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 17, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 17, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 17, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 18, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 18, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 18, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 18, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 19, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 19, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 19, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 19, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null },

      {round: 20, weight: 16, name: "Reverse Lunge per side", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:3, duration: null, rest: null },
      {round: 20, weight: 16, name: "Rack Squat per side", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:3, duration: null, rest: null },
      {round: 20, weight: 16, name: "Strict Press per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:3, duration: null, rest: null },
      {round: 20, weight: null, name: "Superset 2 - 1 min - Rest", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:null, duration: 60, rest: null }
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
      { round: 1, weight: 16, name: "10x - Snatches per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: null  },
      { round: 1, weight: 16, name: "6x - Renegade rows superset", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:6, duration: null, rest: null  },
      { round: 1, weight: 16, name: "Farmers carry", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null  },
      { round: 1, weight: 16, name: "5x - High pulls per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  },
      { round: 1, weight: 16, name: "10x - Swings per side superset", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: null  },

      { round: 2, weight: 16, name: "10x - Snatches per side", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:10, duration: null, rest: null  },
      { round: 2, weight: 16, name: "6x - Renegade rows superset", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:6, duration: null, rest: null  },
      { round: 2, weight: 16, name: "Farmers carry", url: "https://www.youtube.com/watch?v=example_gobletsquat", rep:null, duration: 60, rest: null  },
      { round: 2, weight: 16, name: "5x - High pulls per side", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  },
      { round: 2, weight: 16, name: "10x - Swings per side superset", url: "https://www.youtube.com/watch?v=example_cleanjerkleft", rep:10, duration: null, rest: null  },

      { round: 3, weight: 16, name: "15x - Snatches L", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:15, duration: null, rest: null  },
      { round: 3, weight: 16, name: "15x - Snatches R", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:15, duration: null, rest: null  },
      { round: 3, weight: 16, name: "5x - Renegade rows (EMOM)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  },

      { round: 4, weight: 16, name: "15x - Snatches L", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:15, duration: null, rest: null  },
      { round: 4, weight: 16, name: "15x - Snatches R", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:15, duration: null, rest: null  },
      { round: 4, weight: 16, name: "5x - Renegade rows (EMOM)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  },

      { round: 5, weight: 16, name: "15x - Snatches L", url: "https://www.youtube.com/watch?v=example_cleanjerkright", rep:15, duration: null, rest: null  },
      { round: 5, weight: 16, name: "15x - Snatches R", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:15, duration: null, rest: null  },
      { round: 5, weight: 16, name: "5x - Renegade rows (EMOM)", url: "https://www.youtube.com/watch?v=example_snatchleft", rep:5, duration: null, rest: null  }
    ]
  }
];

let wakeLock = null;

// Guided workout state
const guidedState = {
  active: false,
  paused: false,
  currentWorkoutIndex: 0,
  steps: [], // { type: 'work' | 'rest', name, url, round, duration }
  currentStepIndex: 0,
  remainingSeconds: 0,
  timerId: null,
  isPrep: false
};

// Prevent screen dimming / sleep while the page is open
async function enableWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Screen Wake Lock activated.');

      // Reacquire wake lock if it’s lost (e.g., when user switches tab)
      document.addEventListener('visibilitychange', async () => {
        if (wakeLock !== null && document.visibilityState === 'visible') {
          wakeLock = await navigator.wakeLock.request('screen');
        }
      });
    } else {
      console.warn('Wake Lock API not supported on this device.');
    }
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

// Release wake lock when user explicitly turns it off
async function disableWakeLock() {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
    console.log('Screen Wake Lock released.');
  }
}

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

// Utility: simple beep using Web Audio
// Utility: simple beep using Web Audio
function playBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 880;        // general beep
    gain.gain.setValueAtTime(0.2, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);

    osc.onended = () => ctx.close();
  } catch (err) {
    console.warn('Beep failed:', err);
  }
}

// ✅ NEW: slightly different sound indicating EXERCISE START
function playStartBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 700;        // a bit lower, softer start tone
    gain.gain.setValueAtTime(0.25, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);

    osc.onended = () => ctx.close();
  } catch (err) {
    console.warn('Start beep failed:', err);
  }
}

// Utility: vibration
function vibratePattern() {
  if ('vibrate' in navigator) {
    navigator.vibrate([100, 80, 100]);
  }
}

// Build guided steps for selected workout
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

// Map weight (kg) to label color class
function getWeightColorClass(weight) {
  const w = Number(weight);
  switch (w) {
    case 8:  return 'weight-8';
    case 12: return 'weight-12';
    case 16: return 'weight-16';
    case 20: return 'weight-20';
    case 24: return 'weight-24';
    case 28: return 'weight-28';
    case 32: return 'weight-32';
    default: return '';
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
  const round = currentStep.round != null ? currentStep.round : null;

  return { round, current, total };
}

// Update timer text: R: X | E: A/B | MM:SS
function updateGuidedTimerDisplay() {
  const { round, current, total } = computeExerciseProgress();
  const time = formatTime(guidedState.remainingSeconds);

  const rStr = round != null ? round : '-';
  const eStr = total > 0 ? `${current}/${total}` : '-/-';

  guidedTimer.textContent = `R: ${rStr} | E: ${eStr} | ${time}`;
}

// Render guided NOW / NEXT list
function renderGuidedList() {
  const steps = guidedState.steps;
  const idx = guidedState.currentStepIndex;

  const now = steps[idx];
  const next = steps[idx + 1];

  let html = '';

    if (guidedState.isPrep) {
    guidedList.innerHTML = `
        <li class="guided-item guided-now">
        <span class="guided-label now">Prep</span>
        <div class="guided-body">
            <div class="guided-name">Get Ready</div>
            <div class="guided-meta">Starting in ${formatTime(guidedState.remainingSeconds)}</div>
        </div>
        </li>
    `;

    updateGuidedTimerDisplay();
    return;
    }

  if (now) {
    const nowWeightClass = getWeightColorClass(now.weight);
    html += `
      <li class="guided-item guided-now" data-step-index="${idx}">
        <span class="guided-label now ${nowWeightClass}">Now</span>
        <div class="guided-body">
          <div class="guided-name">${now.name}</div>
          <div class="guided-meta">
            ${now.type === 'rest' ? 'Rest' : 'Work'}
            • ${formatTime(guidedState.remainingSeconds || now.duration)}
            ${now.round ? ` • R${now.round}` : ''}
            ${now.weight ? ` • ${now.weight}kg` : ''}
            ${now.reps ? ` • ${now.reps} reps` : ''}
          </div>
        </div>
      </li>
    `;
  }

  if (next) {
    const nextWeightClass = getWeightColorClass(next.weight);
    html += `
      <li class="guided-item guided-next" data-step-index="${idx + 1}">
        <span class="guided-label next ${nextWeightClass}">Next</span>
        <div class="guided-body">
          <div class="guided-name">${next.name}</div>
          <div class="guided-meta">
            ${next.type === 'rest' ? 'Rest' : 'Work'}
            • ${formatTime(next.duration)}
            ${next.round ? ` • R${next.round}` : ''}
            ${next.weight ? ` • ${next.weight}kg` : ''}
            ${next.reps ? ` • ${next.reps} reps` : ''}
          </div>
        </div>
      </li>
    `;
  } else if (!now) {
    // Workout complete view
    html += `
      <li class="guided-item guided-done">
        <span class="guided-label now">Done</span>
        <div class="guided-body">
          <div class="guided-name">Workout complete 🎉</div>
          <div class="guided-meta">Nice job. Hit "Start Guided" to go again.</div>
        </div>
      </li>
    `;
  } else {
    // No next, but still final "now" step
    html += `
      <li class="guided-item guided-next">
        <span class="guided-label next">Next</span>
        <div class="guided-body">
          <div class="guided-name">Workout complete 🎉</div>
          <div class="guided-meta">Finish this step and you're done.</div>
        </div>
      </li>
    `;
  }

  guidedList.innerHTML = html;

  // ⏱ new combined timer text (round + exercise + time)
  updateGuidedTimerDisplay();

  centerGuidedRows();
  syncExerciseHighlight();
}

// Auto-scroll to keep NOW/NEXT centered
function centerGuidedRows() {
  const nowRow = guidedList.querySelector('.guided-now');
  if (!nowRow) return;

  // Use scrollIntoView to center current row in wrapper
  //nowRow.scrollIntoView({
  //  behavior: 'smooth',
  //  block: 'center'
  //});
}

// Start the countdown for current step
function startStepTimer() {
  clearInterval(guidedState.timerId);

  // ✅ PREP MODE
  if (guidedState.isPrep) {
    guidedState.timerId = setInterval(() => {
      if (guidedState.paused) return;

      guidedState.remainingSeconds -= 1;
      updateGuidedTimerDisplay();
      renderGuidedList();

      // ✅ 3-2-1 sounds during prep
      handleFinalCountdownBeep(guidedState.remainingSeconds);

      if (guidedState.remainingSeconds <= 0) {
        clearInterval(guidedState.timerId);

        guidedState.isPrep = false;
        guidedState.remainingSeconds = 0;

        // ✅ Start first REAL exercise with start beep
        playStartBeep();
        startStepTimer();
      }
    }, 1000);

    return;
  }

  // ✅ NORMAL MODE (unchanged logic)
  const current = guidedState.steps[guidedState.currentStepIndex];
  if (!current) {
    guidedState.remainingSeconds = 0;
    updateGuidedTimerDisplay();
    renderGuidedList();
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    guidedState.paused = false;
    playBeep();
    vibratePattern();
    return;
  }

  if (!guidedState.remainingSeconds || guidedState.remainingSeconds <= 0) {
    guidedState.remainingSeconds = current.duration;
    if (current.type === 'work') {
      playStartBeep();
    }
  }

  updateGuidedTimerDisplay();
  renderGuidedList();

  guidedState.timerId = setInterval(() => {
    if (guidedState.paused) return;

    guidedState.remainingSeconds -= 1;
    updateGuidedTimerDisplay();

    const step = guidedState.steps[guidedState.currentStepIndex];
    const half = Math.floor(step.duration / 2);

    if (guidedState.remainingSeconds === half) {
      playBeep();
      vibratePattern();
    }

    handleFinalCountdownBeep(guidedState.remainingSeconds);

    if (guidedState.remainingSeconds <= 0) {
      clearInterval(guidedState.timerId);
      playBeep();
      vibratePattern();

      guidedState.currentStepIndex += 1;
      guidedState.remainingSeconds = 0;
      startStepTimer();
    }
  }, 1000);
}

function syncExerciseHighlight() {
  const allItems = document.querySelectorAll('.exercise-item');
  const steps = guidedState.steps || [];
  const idx = guidedState.currentStepIndex;

  if (!steps.length || !allItems.length) return;

  // ✅ Count how many WORK steps are fully completed
  let completedWorkCount = 0;
  for (let i = 0; i < idx; i++) {
    if (steps[i].type === 'work') {
      completedWorkCount++;
    }
  }

  // ✅ Mark completed exercises as .done & clear active
  allItems.forEach((li, i) => {
    li.classList.remove('active');
    li.style.color = '';

    if (i < completedWorkCount) {
      li.classList.add('done');   // ✅ permanently gone from the list
    }
  });

  const currentStep = steps[idx];
  // During rest: nothing is active, list just shows remaining future exercises
  if (!currentStep || currentStep.type !== 'work') return;

  // Active item is the first non-done exercise in the list
  const activeItem = allItems[completedWorkCount];
  if (!activeItem) return;

  activeItem.classList.add('active');

  // ✅ Use weight-based color from "Now" pill
  const guidedNowLabel = document.querySelector('.guided-label.now');
  if (guidedNowLabel) {
    const color = getComputedStyle(guidedNowLabel).backgroundColor;
    activeItem.style.color = color;
  }
}

// Start guided workout
function startGuidedWorkout() {
  const currentIndex = Math.max(1, Math.min(workouts.length, parseInt(numberInput.value, 10) || 1)) - 1;
  const workout = workouts[currentIndex];

  guidedState.active = true;
  guidedState.paused = false;
  guidedState.currentWorkoutIndex = currentIndex;
  guidedState.steps = buildGuidedSteps(workout);
  guidedState.currentStepIndex = 0;

  // ✅ 7-second PREP countdown before first exercise
  guidedState.remainingSeconds = 7;
  guidedState.isPrep = true;

  document.body.classList.add('guided-active');
  guidedContainer.classList.remove('hidden');

  pauseBtn.disabled = false;
  pauseBtn.textContent = 'Pause';

  startGuidedBtn.textContent = 'Restart Guided Workout';

  renderGuidedList();
  startStepTimer();
}

// Stop/clear guided workout state (used when changing workouts or leaving)
function stopGuidedWorkout() {
  clearInterval(guidedState.timerId);
  guidedState.active = false;
  guidedState.paused = false;
  guidedState.steps = [];
  guidedState.currentStepIndex = 0;
  guidedState.remainingSeconds = 0;
  // guidedTimer.textContent = '00:00';
  updateGuidedTimerDisplay();
  guidedList.innerHTML = '';
  pauseBtn.disabled = true;
  pauseBtn.textContent = 'Pause';
  document.body.classList.remove('guided-active');
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

// Initialize workout controls
function initControls() {
  slider.min = 1;
  slider.max = workouts.length;
  slider.value = 1;
  numberInput.min = 1;
  numberInput.max = workouts.length;
  numberInput.value = 1;

  // Enable screen wake lock on load
  enableWakeLock();
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
      <div class="meta-item">
        <span class="meta-label">Objective:</span>
        <span class="meta-value">${w.objective}</span>
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

    ${w.finisher ? `
      <div class="workout-meta aligned bordered finisher">
        <div class="meta-item">
          <span class="meta-label">Finisher:</span>
          <span class="meta-value">${w.finisher}</span>
        </div>
      </div>
    ` : ""}

    <ul class="exercise-list">${exercisesHTML}</ul>
  </div>
  `;
}

function updateControls(value) {
  const val = Math.max(1, Math.min(parseInt(value), workouts.length));
  slider.value = val;
  numberInput.value = val;
  showWorkout(val);

  // If user changes workout while guided is running, reset guided mode
  if (guidedState.active) {
    stopGuidedWorkout();
  }
}

// Event listeners
slider.addEventListener("input", e => updateControls(e.target.value));
numberInput.addEventListener("change", e => updateControls(e.target.value));
plusBtn.addEventListener("click", () => updateControls(Number(numberInput.value) + 1));
minusBtn.addEventListener("click", () => updateControls(Number(numberInput.value) - 1));
generateBtn.addEventListener("click", () => updateControls(Math.floor(Math.random() * workouts.length) + 1));

startGuidedBtn.addEventListener("click", () => {
  startGuidedWorkout();
});

pauseBtn.addEventListener("click", () => {
  togglePause();
});

// Init
initControls();
showWorkout(1);
