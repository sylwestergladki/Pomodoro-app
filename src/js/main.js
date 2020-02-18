"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// place your code below

let countdown;
const start = document.querySelector('#startTimer');
const continueButton = document.querySelector('#continueTimer');
const pause = document.querySelector('#pauseTimer');
const reset = document.querySelector('#resetTimer');
const timerDisplay = document.querySelector('.clock');
const key = "operation";
let resumeTime;
let pomodoroStage = 0;
let timeForPomodoro = 1500;
let key = 0;


function timer(seconds) {
  
  // clear any existing timers
  clearInterval(countdown);
 
  const now = Date.now();
  const then = now + seconds * 1000;
 
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    resumeTime = secondsLeft;
    // check if we should stop it!
    if(secondsLeft < 0 ) {
      sound();
      clearInterval(countdown);
      continueButton.style.display="none";
      reset.classList.remove("pause-action");
      pause.style.display = "none";
      start.style.display = "block";
     
      pomodoroStage == 7 ? pomodoroStage = 0 :  pomodoroStage++;
      pomodoroChapter();
     
      return ;
    }
    else if(key==1)
    {clearInterval(countdown);
      return resumeTime;
    }

    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes< 10? '0':''}${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  timerDisplay.innerHTML = display;
}


//start timer

start.addEventListener('click', firstPomodoro);

function firstPomodoro(){
 
  pause.style.display ="block";
  start.style.display ="none";
  timer(timeForPomodoro);
}



//pause timer

pause.addEventListener('click', pausePomodoro)

function pausePomodoro(){
  key = 1;
  reset.classList.add("pause-action");
  continueButton.style.display = "block";
  
  pause.style.display = "none";
  
}

//reset timer

reset.addEventListener('click', resetPomodoro)

function resetPomodoro(){
  key = 0;
  continueButton.style.display="none";
  reset.classList.remove("pause-action");
  pause.style.display = "none";
  start.style.display = "block";
  timerDisplay.innerHTML = `25:00`;
  pomodoroStage = 0
}

//resume timer

continueButton.addEventListener('click', continuePomodoro);

function continuePomodoro(){
  console.log(resumeTime);
  continueButton.style.display="none";
  reset.classList.remove("pause-action");
  pause.style.display = "block";
  start.style.display = "none";
  key = 0;
  timer(resumeTime);
  
}




//Check a pomodoroChapter

function pomodoroChapter(){ //if i have 0 then i work
  if(pomodoroStage==0){ //break
    clock.innerHTML= `25:00`
    timeForPomodoro = 1500;
    return timeForPomodoro;
    }

  else if(pomodoroStage==1){ //break
  clock.innerHTML= `05:00`
  timeForPomodoro = 300;
  return timeForPomodoro;
  }
  else if(pomodoroStage==2){ //work
  clock.innerHTML= `25:00`
  timeForPomodoro = 1500;
  return timeForPomodoro;
  }
  
  else if(pomodoroStage==3){ //break
    clock.innerHTML= `05:00`
    timeForPomodoro = 300;
    return timeForPomodoro;
  }
  else if(pomodoroStage==4){ //work
    clock.innerHTML= `25:00`
    timeForPomodoro = 1500;
    return timeForPomodoro;
    }
    else if(pomodoroStage==5){ //break
      clock.innerHTML= `05:00`
      timeForPomodoro = 300;
      return timeForPomodoro;
    }
    else if(pomodoroStage==6){ //work
      clock.innerHTML= `25:00`
      timeForPomodoro = 1500;
      return timeForPomodoro;
    }
    else if(pomodoroStage==7){ //break
      clock.innerHTML= `15:00`
      timeForPomodoro = 900;
      
      return timeForPomodoro, pomodoroStage;
    }
  

}


//play ding sound
function sound(){
  let dingSound = new Audio("../assets/Ding.wav");
  dingSound.play();
}