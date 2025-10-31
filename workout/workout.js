/* === Unified Fonts & Theme === */
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@300;900&display=swap");

:root {
  --bg: #F6F7FB;
  --text: #22194D;
  --prep: #FFAC1C;
  --work: #FC1500;
  --rest: #69FC00;
  --active: #5DADD5;
  --card-bg: #fff;
  --border: #ddd;
  --muted: #555;
}

/* === Global Reset === */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Dosis', sans-serif;
}

html, body {
  height: 100%;
}

body {
  background: var(--bg);
  color: var(--text);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow-y: auto;
}

/* === Main Layout === */
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* === Workout Display === */
#workout-display {
  width: 100%;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  margin-bottom: 20px;
  border: 1px solid var(--border);
  transition: background 0.25s, color 0.25s;
}

.round-indicator {
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 8px;
}

.phase-label {
  font-weight: 900;
  font-size: 2rem; /* same as about-section h2 */
  margin-bottom: 10px;
  color: var(--text);
}

.status {
  font-weight: 400;
  margin-bottom: 20px;
  font-size: 1.25rem; /* aligned with about-section p */
  color: var(--muted);
  line-height: 1.6;
}

/* === Workout Meta Data === */
#workout-display p strong {
  font-weight: 900;
}

#workout-display p {
  font-size: 1.25rem; /* same as description and about text */
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 4px;
}

ul {
  text-align: left;
  margin: 10px 0 10px 20px;
  font-size: 1.25rem;
  line-height: 1.6;
  color: #333;
}

ul li {
  list-style-type: disc;
  margin-bottom: 5px;
}

/* === Controls Section === */
.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* === Select Workout Label === */
.controls label {
  font-size: 1.25rem; /* same as button text */
  font-weight: 900;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* === Slider === */
.range-row {
  width: 100%;
  text-align: center;
}

.range-row input[type="range"] {
  width: 100%;
  accent-color: var(--active);
}

/* === Stepper === */
.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 10px 0;
}

.stepper button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: var(--active);
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;
}

.stepper button:hover {
  background: var(--work);
}

.stepper input {
  width: 60px;
  text-align: center;
  border: 1px solid #cfd6df;
  border-radius: 6px;
  padding: 6px;
  font-size: 16px;
}

/* === Generate Workout Button === */
#generate-btn {
  width: 100%;
  max-width: 800px;
  padding: 16px 0;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #f4f4f4; /* same tone as about-header */
  color: #333;
  font-size: 1.25rem; /* same as section text */
  font-weight: 900;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s, color 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

#generate-btn:hover {
  background: var(--active);
  color: #fff;
}

#generate-btn:active {
  transform: scale(0.98);
}

/* === Unified Links (same as About page) === */
a {
  color: var(--active);
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s, text-decoration 0.2s;
}

a:hover,
a:focus {
  text-decoration: underline;
  color: var(--work);
}

/* === Footer === */
.footer {
  font-size: 0.9rem;
  color: #999;
  text-align: center;
  margin-top: 40px;
  padding: 10px;
  border-top: 1px solid var(--border);
}

/* === Responsive Typography === */
@media (max-width: 600px) {
  .phase-label {
    font-size: 1.5rem;
  }

  .status,
  ul,
  #workout-display p {
    font-size: 1.25rem;
  }

  .controls label,
  #generate-btn {
    font-size: 1.1rem;
  }
}
