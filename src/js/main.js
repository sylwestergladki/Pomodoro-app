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
let timeForPomodoro = 10;

localStorage.setItem(key, 0)


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
      reset.style.display = "none";
      pause.classList.remove("pause-visible");
      start.style.display = "block";
     
      pomodoroStage == 7 ? pomodoroStage = 0 :  pomodoroStage++;
      pomodoroChapter();
     
      return ;
    }
    else if(localStorage.getItem(key)==1)
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

start.addEventListener('click', firstPomodoro);

function firstPomodoro(){
 
  pause.classList.add("pause-visible");
  start.style.display ="none";
  timer(timeForPomodoro);
}





pause.addEventListener('click', pausePomodoro)

function pausePomodoro(){
  localStorage.setItem(key,1);
  continueButton.style.display="block";
  reset.style.display = "block"
  pause.classList.remove("pause-visible");
  
}

reset.addEventListener('click', resetPomodoro)

function resetPomodoro(){
  localStorage.setItem(key,0);
  continueButton.style.display="none";
  reset.style.display = "none";
  pause.classList.remove("pause-visible");
  start.style.display = "block";
  timerDisplay.innerHTML = `00:10`;
  pomodoroStage = 0
}


continueButton.addEventListener('click', continuePomodoro);

function continuePomodoro(){
  console.log(resumeTime);
  continueButton.style.display="none";
  reset.style.display = "none";
  pause.classList.add("pause-visible");
  start.style.display = "none";
  localStorage.setItem(key, 0)
  timer(resumeTime);
  
}




//Check a pomodoroChapter

function pomodoroChapter(){ //if i have 0 then i work
  if(pomodoroStage==0){ //break
    clock.innerHTML= `00:10`
    timeForPomodoro = 10;
    return timeForPomodoro;
    }

  else if(pomodoroStage==1){ //break
  clock.innerHTML= `00:05`
  timeForPomodoro = 5;
  return timeForPomodoro;
  }
  else if(pomodoroStage==2){ //work
  clock.innerHTML= `00:10`
  timeForPomodoro = 10;
  return timeForPomodoro;
  }
  
  else if(pomodoroStage==3){ //break
    clock.innerHTML= `00:05`
    timeForPomodoro = 5;
    return timeForPomodoro;
  }
  else if(pomodoroStage==4){ //work
    clock.innerHTML= `00:10`
    timeForPomodoro = 10;
    return timeForPomodoro;
    }
    else if(pomodoroStage==5){ //break
      clock.innerHTML= `00:05`
      timeForPomodoro = 5;
      return timeForPomodoro;
    }
    else if(pomodoroStage==6){ //work
      clock.innerHTML= `00:10`
      timeForPomodoro = 10;
      return timeForPomodoro;
    }
    else if(pomodoroStage==7){ //break
      clock.innerHTML= `00:07`
      timeForPomodoro = 7;
      
      return timeForPomodoro, pomodoroStage;
    }
  

}


//play ding sound
function sound(){
  let dingSound = new Audio("../assets/Ding.wav");
  dingSound.play();
}