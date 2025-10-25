(() => {
  const $ = id => document.getElementById(id);
  const screen = $('screen'), digits = $('digits'), phaseLabel = $('phaseLabel'), status = $('status'),
        barFill = $('barFill'), roundIndicator = $('roundIndicator');
  const muteBtn = $('muteBtn'), halfBtn = $('halfBtn'), reverseBtn = $('reverseBtn'),
        skipBtn = $('skipBtn'), resetBtn = $('resetBtn'), loopBtn = $('loopBtn'), presetBtn = $('presetBtn');
  const roundsSlider = $('roundsSlider'), prepSlider = $('prepSlider'),
        roundsVal = $('roundsVal'), prepVal = $('prepVal');
  const roundSettings = $('roundSettings');

  // Preset descriptions shown during PREP phase
  const presetNames = {
    C0: "C0 - Warm-up - 5x1W | 5x1R",
    C1: "C1 - Endurance - 10x1W | 10x1R",
    C2: "C2 - Power - 5x2W | 5x2R",
    C3: "C3 - Strength - 3x3W | 3x3R",
    C4: "C4 - Pyramid - 1,2,3,4",
    C5: "C5 - Pentathlon - 5x6W | 5x5R",
    C6: "C6 - Mixed Challenge - 1,2,3,2,1",
    C7: "C7 - Climb & Descend - 1,2,3,4,3,2,1"
  };

  let defaultSchedules = {
    C0:[{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60}],
    C1:[{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60}],
    C2:[{work:120,rest:120},{work:120,rest:120},{work:120,rest:120},{work:120,rest:120},{work:120,rest:120}],
    C3:[{work:180,rest:180},{work:180,rest:180},{work:180,rest:180}],
    C4:[{work:60,rest:45},{work:120,rest:90},{work:180,rest:120},{work:240,rest:180}],
    C5:[{work:360,rest:300},{work:360,rest:300},{work:360,rest:300},{work:360,rest:300},{work:360,rest:300}],
    C6:[{work:60,rest:45},{work:120,rest:90},{work:180,rest:120},{work:120,rest:120},{work:60,rest:45}],
    C7:[{work:60,rest:60},{work:120,rest:120},{work:180,rest:180},{work:240,rest:180},{work:180,rest:180},{work:120,rest:120},{work:60,rest:60}]
  };

  let presetKeys = ['C0','C1','C2','C3','C4','C5','C6','C7'], currentPreset = 0;

  let schedule = [], totalRounds = 3, roundIndex = 0, reverseMode = false, muted = false,
      halfwayEnabled = true, loopMode = false;
  let phase = 'prep', phaseSeconds = parseInt(prepSlider.value,10) || 10,
      phaseTotal = phaseSeconds, running = false, lastTick = null,
      prepDone = false, midTicked = false;
  let prepFirstRun = true;

  // ------------------------ SOUND LOGIC ------------------------
  // threeTwoOne: plays in last 3 seconds of Prep/Work/Rest
  const threeTwoOne = new Howl({src:['https://cdn.freesound.org/previews/540/540902_6279822-lq.mp3'], volume:0.7});
  // longSound: plays at exactly 0s (end of phase)
  const longSound = new Howl({src:['https://cdn.freesound.org/previews/404/404151_6142149-lq.mp3'], volume:1.0});
  // halfwayBeep: plays halfway through work/rest
  const halfwayBeep = new Howl({src:['https://cdn.freesound.org/previews/560/560188_6086693-lq.mp3'], volume:0.9});
  // endBeep: plays when entire session finishes
  const endBeep = new Howl({src:['https://freesound.org/data/previews/66/66717_931655-lq.mp3'], volume:0.9});

  function vibrate(p){ if(navigator && 'vibrate' in navigator) navigator.vibrate(p); }
  function play(t){
    if(muted) return;
    if(t === '321') threeTwoOne.play();
    else if(t === '0') longSound.play();
    else if(t === 'half') halfwayBeep.play();
    else if(t === 'complete') endBeep.play();
  }

  function fmt(s){ s = Math.max(0, Math.floor(s)); return String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0'); }

  // ------------------------ UPDATE UI ------------------------
  function updateRoundIndicator(){
    if(phase === 'prep'){
      roundIndicator.textContent = presetNames[presetKeys[currentPreset]] || 'GET READY';
    } else {
      roundIndicator.textContent = `Round ${roundIndex+1} of ${totalRounds}`;
    }
  }

  function updateBar(){ barFill.style.width = (phaseTotal ? ((phaseTotal - phaseSeconds) / phaseTotal) * 100 : 0) + '%'; }

  function updatePhaseUI(){
    if(phase === 'prep'){
      screen.style.background = 'var(--prep)';
      barFill.style.background = 'var(--prep)';
      phaseLabel.textContent = 'GET READY';
      status.textContent = 'Starting soon...';
    } else if(phase === 'work'){
      screen.style.background = 'var(--work)';
      barFill.style.background = 'var(--work)';
      phaseLabel.textContent = 'WORK';
      status.textContent = 'Savor the load';
    } else {
      screen.style.background = 'var(--rest)';
      barFill.style.background = 'var(--rest)';
      phaseLabel.textContent = 'REST';
      status.textContent = 'Take a rest';
    }
    digits.textContent = fmt(phaseSeconds);
    updateBar();
    updateRoundIndicator();
  }

  // ------------------------ RENDER SLIDERS ------------------------
  function renderRoundInputs(){
    roundSettings.innerHTML = '';
    totalRounds = Math.max(3, parseInt(roundsSlider.value,10) || 3);
    for(let i=0;i<totalRounds;i++){
      const cur = schedule[i] || defaultSchedules.C0[i] || {work:60,rest:60};
      const div = document.createElement('div');
      div.className = 'round-row';
      div.innerHTML = `
        <strong>R${i+1}</strong>
        <div class="slider-row">Work: <input type="range" min="0" max="360" value="${cur.work}" id="w${i}">
          <div class="stepper">
            <button class="dec" data-i="${i}" data-type="work">-</button>
            <input type="number" id="wVal${i}" value="${cur.work}" readonly>
            <button class="inc" data-i="${i}" data-type="work">+</button>
          </div>
        </div>
        <div class="slider-row">Rest: <input type="range" min="0" max="360" value="${cur.rest}" id="r${i}">
          <div class="stepper">
            <button class="dec" data-i="${i}" data-type="rest">-</button>
            <input type="number" id="rVal${i}" value="${cur.rest}" readonly>
            <button class="inc" data-i="${i}" data-type="rest">+</button>
          </div>
        </div>
      `;
      roundSettings.appendChild(div);

      const wRange = $('w'+i), rRange = $('r'+i), wVal = $('wVal'+i), rVal = $('rVal'+i);
      wRange.addEventListener('input', () => { schedule[i].work = parseInt(wRange.value,10); wVal.value = schedule[i].work; });
      rRange.addEventListener('input', () => { schedule[i].rest = parseInt(rRange.value,10); rVal.value = schedule[i].rest; });

      div.querySelectorAll('.stepper button').forEach(btn => {
        btn.addEventListener('click', () => {
          const type = btn.dataset.type, idx = parseInt(btn.dataset.i,10);
          let val = (type === 'work' ? schedule[idx].work : schedule[idx].rest);
          val += btn.classList.contains('inc') ? 15 : -15;
          if(type === 'work') val = Math.min(Math.max(1,val),360);
          else val = Math.min(Math.max(0,val),360);
          schedule[idx][type] = val;
          $('w'+idx).value = schedule[idx].work;
          $('r'+idx).value = schedule[idx].rest;
          $('wVal'+idx).value = schedule[idx].work;
          $('rVal'+idx).value = schedule[idx].rest;
        });
      });
    }
  }

  function readSchedule(){
    schedule = [];
    totalRounds = Math.max(3, parseInt(roundsSlider.value,10) || 3);
    for(let i=0;i<totalRounds;i++){
      const w = $('w'+i), r = $('r'+i);
      schedule.push({
        work: w ? parseInt(w.value,10) || 60 : 60,
        rest: r ? parseInt(r.value,10) || 60 : 60
      });
    }
  }

  // ------------------------ WAKE LOCK (prevent dimming) ------------------------
  let wakeLock = null;
  async function requestWakeLock(){
    try{
      if('wakeLock' in navigator && !wakeLock){
        wakeLock = await navigator.wakeLock.request('screen');
        // release on visibility change
        document.addEventListener('visibilitychange', async () => {
          if(document.visibilityState === 'visible' && running){
            try{ wakeLock = await navigator.wakeLock.request('screen'); }catch(e){ /* ignore */ }
          }
        });
      }
    }catch(e){ console.warn('WakeLock failed', e); }
  }
  function releaseWakeLock(){ if(wakeLock){ try{ wakeLock.release(); }catch(e){} wakeLock = null; } }

  // ------------------------ PHASE CONTROL ------------------------
  function setPhase(p){
    phase = p;
    midTicked = false;

    const cur = schedule[roundIndex];
    if(p === 'prep'){
      phaseSeconds = parseInt(prepSlider.value,10) || 10;
    } else if(p === 'work'){
      // IMPORTANT: do NOT play any sound at the START of work (all work phases)
      phaseSeconds = cur.work;
    } else { // rest
      phaseSeconds = cur.rest;
    }
    phaseTotal = phaseSeconds;
    updatePhaseUI();
  }

  // ------------------------ STEP / ADVANCE LOGIC ------------------------
  function nextStep(){
    // If we were in PREP -> go to WORK (prep's end will have played 0 already)
    if(phase === 'prep'){
      setPhase('work');
      prepDone = true;
      prepFirstRun = false;
      return;
    }

    // At the point nextStep is invoked we are finishing the current phase (work or rest)
    // play '0' sound for the phase's exact end (already handled in tick when now===0).
    // Do NOT play any 'start' sound at the moment of entering WORK.

    // If finishing a work phase and rest exists, go to rest
    if(phase === 'work' && (schedule[roundIndex]?.rest || 0) > 0){
      setPhase('rest');
      vibrate(60);
      return;
    }

    // Otherwise, we've finished a rest (or work with no rest) so end-of-round logic:
    // play longSound already handled in tick; now decide next round / loop / finish
    if(reverseMode){
      if(roundIndex > 0){
        roundIndex--;
        setPhase('work');
        vibrate(60);
      } else if(loopMode){
        roundIndex = totalRounds - 1;
        if(prepFirstRun){
          setPhase('prep');
          prepFirstRun = false;
          prepDone = false;
        } else {
          setPhase('work');
        }
        vibrate(60);
      } else {
        finishAll();
      }
    } else {
      if(roundIndex + 1 < totalRounds){
        roundIndex++;
        setPhase('work');
        vibrate(60);
      } else if(loopMode){
        roundIndex = 0;
        if(prepFirstRun){
          setPhase('prep');
          prepFirstRun = false;
          prepDone = false;
        } else {
          setPhase('work');
        }
        vibrate(60);
      } else {
        finishAll();
      }
    }
  }

  function finishAll(){
    running = false;
    cancelAnimationFrame(raf);
    releaseWakeLock();
    digits.textContent = '00:00';
    phaseLabel.textContent = 'DONE';
    status.textContent = 'Complete!';
    barFill.style.width = '100%';
    play('complete'); // final session complete sound
    vibrate([80,40,80]);
  }

  // ------------------------ TICK (animation frame) ------------------------
  let raf;
  function tick(ts){
    if(!running){ lastTick = ts; return; }
    if(!lastTick) lastTick = ts;

    // Keep screen awake while running
    requestWakeLock();

    const delta = (ts - lastTick) / 1000;
    lastTick = ts;
    const prev = Math.ceil(phaseSeconds);
    phaseSeconds = Math.max(0, phaseSeconds - delta);
    const now = Math.ceil(phaseSeconds);

    // Halfway beep for work/rest
    if(!midTicked && (phase === 'work' || phase === 'rest') && phaseTotal > 0 && phaseSeconds <= phaseTotal / 2 && halfwayEnabled){
      play('half');
      vibrate(40);
      midTicked = true;
    }

    // Play 3-2-1 in the last 3 seconds of any phase (prep, work, rest)
    if(now !== prev){
      digits.textContent = fmt(now);

      // Play 3-2-1 for last 3 seconds of any phase (prep/work/rest)
      if(now > 0 && now <= 3){
        play('321');
        vibrate(15);
      }

      // At exact 0s, play the longSound and schedule nextStep
      if(now === 0){
        play('0');
        vibrate([40,20,40]);
        // small delay so the "0" sound is heard before phase flips
        setTimeout(nextStep, 650);
      }
      updateBar();
    }

    raf = requestAnimationFrame(tick);
  }

  // ------------------------ EVENT LISTENERS ------------------------
  screen.addEventListener('click', () => {
    readSchedule();
    // If finished, pressing should start the whole sequence again from current phase
    // Existing behavior preserved: toggle pause/resume when running; start when stopped
    if(!running){
      running = true;
      lastTick = performance.now();
      raf = requestAnimationFrame(tick);
      status.textContent = 'Running';
    } else {
      running = false;
      status.textContent = 'Paused';
      releaseWakeLock();
    }
  });

  muteBtn.addEventListener('click', () => {
    muted = !muted;
    muteBtn.classList.toggle('active', muted);
    muteBtn.textContent = muted ? 'Mute: ON' : 'Mute: OFF';
    muteBtn.setAttribute('aria-pressed', muted);
  });

  skipBtn.addEventListener('click', () => { nextStep(); play('321'); vibrate(30); });
  reverseBtn.addEventListener('click', () => { reverseMode = !reverseMode; reverseBtn.classList.toggle('active', reverseMode); resetTimer(); });
  loopBtn.addEventListener('click', () => { loopMode = !loopMode; loopBtn.classList.toggle('active', loopMode); });

  resetBtn.addEventListener('click', () => {
    schedule = JSON.parse(JSON.stringify(defaultSchedules[presetKeys[currentPreset]]));
    roundsSlider.value = schedule.length; roundsVal.textContent = schedule.length;
    renderRoundInputs();
    readSchedule();
    resetTimer();
  });

  presetBtn.addEventListener('click', () => {
    currentPreset = (currentPreset + 1) % presetKeys.length;
    const key = presetKeys[currentPreset];
    presetBtn.textContent = presetNames[key];
    schedule = JSON.parse(JSON.stringify(defaultSchedules[key]));
    roundsSlider.value = schedule.length; roundsVal.textContent = schedule.length;
    renderRoundInputs();
    readSchedule();
    resetTimer();
  });

  roundsSlider.addEventListener('input', () => { roundsVal.textContent = roundsSlider.value; renderRoundInputs(); readSchedule(); resetTimer(); });
  prepSlider.addEventListener('input', () => {
    prepVal.textContent = prepSlider.value;
    if(phase === 'prep'){
      phaseSeconds = parseInt(prepSlider.value,10) || 10;
      digits.textContent = fmt(phaseSeconds);
      updateBar();
    }
    resetTimer();
  });

  // ------------------------ RESET ------------------------
  function resetTimer(){
    running = false;
    cancelAnimationFrame(raf);
    releaseWakeLock();
    readSchedule();
    roundIndex = reverseMode ? totalRounds - 1 : 0;
    setPhase('prep');
    prepDone = false;
    prepFirstRun = true;
    digits.textContent = fmt(parseInt(prepSlider.value,10) || 10);
    status.textContent = 'Ready';
    lastTick = null;
    updateRoundIndicator();
  }

  // ------------------------ INIT ------------------------
  function init(){
    renderRoundInputs();
    // Start schedule loaded from default preset (C0)
    currentPreset = 0;
    presetBtn.textContent = presetNames[presetKeys[currentPreset]];
    schedule = JSON.parse(JSON.stringify(defaultSchedules[presetKeys[currentPreset]]));
    roundsSlider.value = schedule.length; roundsVal.textContent = schedule.length;
    readSchedule();
    resetTimer();
  }
  init();

})();
