'use strict'

{
  const display = document.getElementById('display');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  let startTime;
  let stopTime;
  let intervalId;

  function availble(btn) {
    btn.disabled = false;
    btn.classList.add('availble');
  };

  function unavailble(btn) {
    btn.disabled = true;
    btn.classList.remove('availble');
  };

  start.addEventListener('click', ()=>{
    if(stopTime === undefined || stopTime === 0 ){
      startTime = new Date().getTime();
    }else{
      startTime = stopTime;
    }
    unavailble(start);
    unavailble(reset);
    availble(stop);
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
    availble(start);
    availble(reset);
    unavailble(stop);
  });

  reset.addEventListener('click',()=>{
    clearInterval(intervalId);
    startTime = 0;
    stopTime = 0;
    display.textContent = '00:00.000';
    availble(start);
    unavailble(stop);
    unavailble(reset);
  });
}