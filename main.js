const { app, Menu, Tray } = require('electron');
let tray = null;

app.whenReady().then(() => {
  tray = new Tray('logo.png'); // No icon
  tray.setTitle('10:00'); // Initial timer display
  tray.on('click', () => {
    if (timerInterval) {
      resetTimer();
    } else {
      startTimer();
    }
  });
});

let timer = 600; // 10 minutes in seconds
let timerInterval = null;

function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    if (timer === 0) {
      clearInterval(timerInterval);
      resetTimer();
    }
    tray.setTitle(formatTime(timer));
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timer = 600;
  tray.setTitle('10:00');
  timerInterval = null;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}