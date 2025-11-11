(() => {
  const $ = id => document.getElementById(id);
  const screen = $('screen'),
        digits = $('digits'),
        phaseLabel = $('phaseLabel'),
        barFill = $('barFill'),
        roundIndicator = $('roundIndicator');

  const muteBtn = $('muteBtn'),
        halfBtn = $('halfBtn'),
        reverseBtn = $('reverseBtn'),
        skipBtn = $('skipBtn'),
        resetBtn = $('resetBtn'),
        loopBtn = $('loopBtn'),
        presetBtn = $('presetBtn');

  const roundsSlider = $('roundsSlider'),
        prepSlider = $('prepSlider'),
        roundsVal = $('roundsVal'),
        prepVal = $('prepVal'),
        roundSettings = $('roundSettings');

  // Preset descriptions
  const presetNames = {
    C0: "C0 - Warm-up - 5x1W | 5x1R",
    C1: "C1 - Endurance - 10x1W | 10x1R",
    C2: "C2 - Power - 5x2W | 5x2R",
    C3: "C3 - Strength - 3x3W | 3x3R",
    C4: "C4 - Pyramid - 1,2,3,4",
    C5: "C5 - Pentathlon - 5x6W | 5x5R",
    C6: "C6 - Mixed Challenge - 1,2,3,2,1",
    C7: "C7 - Climb&Descend - 1,2,3,4,3,2,1"
  };

  const defaultSchedules = {
    C0:[{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60}],
    C1:[{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60},{work:60,rest:60}],
    C2:[{work:120,rest:120},{work:120,rest:120},{work:120,rest:120},{work:120,rest:120},{work:120,rest:120}],
    C3:[{work:180,rest:180},{work:180,rest:180},{work:180,rest:180}],
    C4:[{work:60,rest:45},{work:120,rest:90},{work:180,rest:120},{work:240,rest:180}],
    C5:[{work:360,rest:300},{work:360,rest:300},{work:360,rest:300},{work:360,rest:300},{work:360,rest:300}],
    C6:[{work:60,rest:45},{work:120,rest:90},{work:180,rest:120},{work:120,rest:120},{work:60,rest:45}],
    C7:[{work:60,rest:60},{work:120,rest:120},{work:180,rest:180},{work:240,rest:180},{work:180,rest:180},{work:120,rest:120},{work:60,rest:60}]
  };

  const presetKeys = Object.keys(presetNames);
  let currentPreset = 0;

  let schedule = [],
      totalRounds = defaultSchedules.C0.length,
      roundIndex = 0,
      reverseMode = false,
      muted = false,
      halfwayEnabled = true,
      loopMode = false;

  let phase = 'prep',
      phaseSeconds = parseInt(prepSlider.value,10) || 10,
      phaseTotal = phaseSeconds,
      running = false,
      lastTick = null,
      prepDone = false,
      midTicked = false,
      prepFirstRun = true;

  // ---------------- SOUND ----------------
  const threeTwoOne = new Howl({src:['https://cdn.freesound.org/previews/540/540902_6279822-lq.mp3'], volume:0.7});
  const longSound = new Howl({src:['https://cdn.freesound.org/previews/404/404151_6142149-lq.mp3'], volume:1.0});
  const halfwayBeep = new Howl({src:['https://cdn.freesound.org/previews/560/560188_6086693-lq.mp3'], volume:0.9});
  const endBeep = new Howl({src:['https://cdn.freesound.org/previews/253/253886_3169537-lq.mp3'], volume:0.9});

  function vibrate(p){ if(navigator && 'vibrate' in navigator) navigator.vibrate(p); }
  function play(t){
    if(muted) return;
    if(t==='321') threeTwoOne.play();
    else if(t==='0') longSound.play();
    else if(t==='half') halfwayBeep.play();
    else if(t==='complete') endBeep.play();
  }
  const fmt = s => {
    s = Math.max(0, Math.floor(s));
    return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  };

  // ---------------- UI UPDATES ----------------
  function updateRoundIndicator(){
    roundIndicator.textContent = 
      phase === 'prep'
        ? presetNames[presetKeys[currentPreset]] || 'GET READY'
        : `Round ${roundIndex+1} of ${totalRounds}`;
  }

  function updateBar(){
    barFill.style.width = (phaseTotal ? ((phaseTotal - phaseSeconds) / phaseTotal) * 100 : 0) + '%';
  }

function updatePhaseUI() {
  // Update screen color and label based on phase
  if (phase === 'prep') {
    screen.dataset.color = 'prep';
    screen.style.background = 'var(--prep)';
    barFill.style.background = 'var(--prep)';
    phaseLabel.textContent = 'GET READY - tap the timer to start / pause';
  } else if (phase === 'work') {
    screen.dataset.color = 'work';
    screen.style.background = 'var(--work)';
    barFill.style.background = 'var(--work)';
    phaseLabel.textContent = 'WORK';
  } else if (phase === 'rest') {
    screen.dataset.color = 'rest';
    screen.style.background = 'var(--rest)';
    barFill.style.background = 'var(--rest)';
    phaseLabel.textContent = 'REST';
  } else if (phase === 'done') {
    screen.dataset.color = 'done';
    screen.style.background = 'var(--rest)';
    barFill.style.background = 'var(--rest)';
    phaseLabel.textContent = 'COMPLETE';
  }
  digits.textContent = fmt(phaseSeconds);
  updateBar();
  updateRoundIndicator();
}

  // ---------------- SLIDERS ----------------
  function renderRoundInputs(){
    roundSettings.innerHTML = '';
    totalRounds = parseInt(roundsSlider.value,10) || defaultSchedules.C0.length;

    for(let i=0;i<totalRounds;i++){
      const cur = schedule[i] || defaultSchedules.C0[i] || {work:60,rest:60};
      const div = document.createElement('div');
      div.className = 'round-row';
      div.innerHTML = `
        <strong>R${i+1}</strong>
        <div class="slider-row">
          Work:
          <input type="range" min="0" max="360" step="15" value="${cur.work}" id="w${i}">
          <div class="stepper">
            <button class="dec" data-i="${i}" data-type="work">-</button>
            <input type="number" id="wVal${i}" value="${cur.work}" readonly>
            <button class="inc" data-i="${i}" data-type="work">+</button>
          </div>
        </div>
        <div class="slider-row">
          Rest:
          <input type="range" min="0" max="360" step="15" value="${cur.rest}" id="r${i}">
          <div class="stepper">
            <button class="dec" data-i="${i}" data-type="rest">-</button>
            <input type="number" id="rVal${i}" value="${cur.rest}" readonly>
            <button class="inc" data-i="${i}" data-type="rest">+</button>
          </div>
        </div>`;
      roundSettings.appendChild(div);

      const wRange = $('w'+i),
            rRange = $('r'+i),
            wVal = $('wVal'+i),
            rVal = $('rVal'+i);

      wRange.addEventListener('input',()=>{schedule[i].work=parseInt(wRange.value,10);wVal.value=schedule[i].work;});
      rRange.addEventListener('input',()=>{schedule[i].rest=parseInt(rRange.value,10);rVal.value=schedule[i].rest;});

      div.querySelectorAll('.stepper button').forEach(btn=>{
        btn.addEventListener('click',()=>{
          const type=btn.dataset.type,idx=parseInt(btn.dataset.i,10);
          let val=type==='work'?schedule[idx].work:schedule[idx].rest;
          val+=btn.classList.contains('inc')?15:-15;
          val=Math.min(Math.max(type==='work'?1:0,val),360);
          schedule[idx][type]=val;
          $('w'+idx).value=schedule[idx].work;
          $('r'+idx).value=schedule[idx].rest;
          $('wVal'+idx).value=schedule[idx].work;
          $('rVal'+idx).value=schedule[idx].rest;
        });
      });
    }
  }

  function readSchedule(){
    schedule=[];
    totalRounds=parseInt(roundsSlider.value,10)||defaultSchedules.C0.length;
    for(let i=0;i<totalRounds;i++){
      const w=$('w'+i),r=$('r'+i);
      schedule.push({
        work:w?parseInt(w.value,10)||60:60,
        rest:r?parseInt(r.value,10)||60:60
      });
    }
  }

  // ---------------- WAKE LOCK ----------------
  let wakeLock=null;
  async function requestWakeLock(){
    try{
      if('wakeLock' in navigator && !wakeLock){
        wakeLock=await navigator.wakeLock.request('screen');
        document.addEventListener('visibilitychange',async()=>{
          if(document.visibilityState==='visible'&&running){
            try{wakeLock=await navigator.wakeLock.request('screen');}catch{}
          }
        });
      }
    }catch(e){console.warn('WakeLock failed',e);}
  }
  function releaseWakeLock(){if(wakeLock){try{wakeLock.release();}catch{}wakeLock=null;}}

  // ---------------- PHASE CONTROL ----------------
  function setPhase(p){
    phase=p;
    midTicked=false;
    const cur=schedule[roundIndex];
    if(p==='prep') phaseSeconds=parseInt(prepSlider.value,10)||10;
    else if(p==='work') phaseSeconds=cur.work;
    else if(p==='rest') phaseSeconds=cur.rest;
    else if(p==='done') phaseSeconds=0;
    phaseTotal=phaseSeconds;
    updatePhaseUI();
  }

  // ---------------- STEP LOGIC ----------------
  function nextStep(){
    if(phase==='prep'){setPhase('work');prepDone=true;prepFirstRun=false;return;}
    if(phase==='work' && (schedule[roundIndex]?.rest||0)>0){setPhase('rest');vibrate(60);return;}

    if(reverseMode){
      if(roundIndex>0){roundIndex--;setPhase('work');vibrate(60);}
      else if(loopMode){roundIndex=totalRounds-1;setPhase(prepFirstRun?'prep':'work');prepFirstRun=false;vibrate(60);}
      else finishAll();
    } else {
      if(roundIndex+1<totalRounds){roundIndex++;setPhase('work');vibrate(60);}
      else if(loopMode){roundIndex=0;setPhase(prepFirstRun?'prep':'work');prepFirstRun=false;vibrate(60);}
      else finishAll();
    }
  }

  function finishAll(){
    running=false;
    cancelAnimationFrame(raf);
    releaseWakeLock();
    digits.textContent='00:00';
    phase='done';
    updatePhaseUI();
    play('complete');
    vibrate([80,40,80]);
  }

  // ---------------- TIMER LOOP ----------------
  let raf;
  function tick(ts){
    if(!running){lastTick=ts;return;}
    if(!lastTick) lastTick=ts;
    requestWakeLock();

    const delta=(ts-lastTick)/1000;
    lastTick=ts;
    const prev=Math.ceil(phaseSeconds);
    phaseSeconds=Math.max(0,phaseSeconds-delta);
    const now=Math.ceil(phaseSeconds);

    if(!midTicked && (phase==='work'||phase==='rest') && phaseTotal>0 && phaseSeconds<=phaseTotal/2 && halfwayEnabled){
      play('half');vibrate(40);midTicked=true;
    }

    if(now!==prev){
      digits.textContent=fmt(now);
      if(now>0 && now<=3){play('321');vibrate(15);}
      if(now===0){play('0');vibrate([40,20,40]);setTimeout(nextStep,650);}
      updateBar();
    }
    raf=requestAnimationFrame(tick);
  }

  // ---------------- EVENTS ----------------
  screen.addEventListener('click', () => {
    readSchedule();

    if (!running) {
      // RESUME
      running = true;
      lastTick = performance.now();
      raf = requestAnimationFrame(tick);

      // Restore the phase color and label
      const phaseColor = screen.dataset.color;
      if (phaseColor === 'prep') {
        screen.style.background = 'var(--prep)';
        barFill.style.background = 'var(--prep)';
        phaseLabel.textContent = 'GET READY - tap the timer to start / pause';
      } else if (phaseColor === 'work') {
        screen.style.background = 'var(--work)';
        barFill.style.background = 'var(--work)';
        phaseLabel.textContent = 'WORK';
      } else if (phaseColor === 'rest') {
        screen.style.background = 'var(--rest)';
        barFill.style.background = 'var(--rest)';
        phaseLabel.textContent = 'REST';
      }

    } else {
      // PAUSE
      running = false;
      cancelAnimationFrame(raf);
      releaseWakeLock();

      // Neutral gray tone for paused state
      screen.style.background = '#D6D7DA';
      barFill.style.background = '#D6D7DA';
      phaseLabel.textContent = 'PAUSED';
    }
  });

  muteBtn.addEventListener('click',()=>{
    muted=!muted;
    muteBtn.classList.toggle('active',muted);
    muteBtn.textContent=muted?'Muted':'Mute';
    muteBtn.setAttribute('aria-pressed',muted);
  });

  skipBtn.addEventListener('click',()=>{nextStep();play('321');vibrate(30);});
  reverseBtn.addEventListener('click',()=>{reverseMode=!reverseMode;reverseBtn.classList.toggle('active',reverseMode);resetTimer();});
  loopBtn.addEventListener('click',()=>{loopMode=!loopMode;loopBtn.classList.toggle('active',loopMode);});

  resetBtn.addEventListener('click',()=>{
    schedule=JSON.parse(JSON.stringify(defaultSchedules[presetKeys[currentPreset]]));
    roundsSlider.value=schedule.length;roundsVal.textContent=schedule.length;
    renderRoundInputs();readSchedule();resetTimer();
  });

  presetBtn.addEventListener('click',()=>{
    currentPreset=(currentPreset+1)%presetKeys.length;
    const key=presetKeys[currentPreset];
    presetBtn.textContent=presetNames[key];
    schedule=JSON.parse(JSON.stringify(defaultSchedules[key]));
    roundsSlider.value=schedule.length;roundsVal.textContent=schedule.length;
    renderRoundInputs();readSchedule();resetTimer();
  });

  roundsSlider.addEventListener('input',()=>{roundsVal.textContent=roundsSlider.value;renderRoundInputs();readSchedule();resetTimer();});
  prepSlider.addEventListener('input',()=>{
    prepVal.textContent=prepSlider.value;
    if(phase==='prep'){
      phaseSeconds=parseInt(prepSlider.value,10)||10;
      digits.textContent=fmt(phaseSeconds);
      updateBar();
    }
    resetTimer();
  });

  // ---------------- RESET ----------------
  function resetTimer(){
    running=false;
    cancelAnimationFrame(raf);
    releaseWakeLock();
    readSchedule();
    roundIndex=reverseMode?totalRounds-1:0;
    setPhase('prep');
    prepDone=false;
    prepFirstRun=true;
    digits.textContent=fmt(parseInt(prepSlider.value,10)||10);
    lastTick=null;
    updateRoundIndicator();
  }

  // ---------------- INIT ----------------
  function init(){
    renderRoundInputs();
    currentPreset=0;
    presetBtn.textContent=presetNames[presetKeys[currentPreset]];
    schedule=JSON.parse(JSON.stringify(defaultSchedules[presetKeys[currentPreset]]));
    roundsSlider.value=schedule.length;roundsVal.textContent=schedule.length;
    readSchedule();
    resetTimer();
  }
  init();
})();
