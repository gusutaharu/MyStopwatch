'use strict'

{
  const display = document.getElementById('display');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  let startTime;
  let stopTime;
  let intervalId;

  start.addEventListener('click', ()=>{
    if(stopTime === undefined || stopTime === 0 ){
      startTime = new Date().getTime();
    }else{
      startTime = stopTime;
    }
    start.disabled = true;
    start.classList.remove('availble');
    stop.disabled = false;
    stop.classList.add('availble');
    reset.disabled = false;
    reset.classList.add('availble');
    intervalId = setInterval(()=>{
      let time = new Date().getTime();
      let baseTime = time - startTime;
      let totalSeconds = Math.floor(baseTime / 1000);
      let minutes = String(Math.floor(totalSeconds / 60)).padStart(2,'0');
      let seconds = String(Math.floor(totalSeconds % 60)).padStart(2,'0');
      let decimal = String(baseTime).slice(-3).padStart(3,'0');
      display.textContent = `${minutes}:${seconds}.${decimal}`;
    },1);
  });

  stop.addEventListener('click',()=>{
    stopTime = startTime;
    clearInterval(intervalId);
    start.disabled = false;
    start.classList.add('availble');
    stop.disabled = true;
    stop.classList.remove('availble');
  });

  reset.addEventListener('click',()=>{
    clearInterval(intervalId);
    startTime = 0;
    stopTime = 0;
    display.textContent = '00:00.000';
    start.disabled = false;
    start.classList.add('availble');
    stop.disabled = true;
    stop.classList.remove('availble');
    reset.disabled = true;
    reset.classList.remove('availble');
  });
}