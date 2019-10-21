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

const timerDisplay = document.querySelector('.clock');

function timer(seconds){
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  coutdown = setInterval(() =>{
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if(secondsLeft <= 0){
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000)
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}