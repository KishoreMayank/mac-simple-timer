const { app, Tray, BrowserWindow, Menu } = require('electron'); // Import Menu
let tray = null;
let win = null;

app.whenReady().then(() => {
  win = new BrowserWindow({
    show: false,
    skipTaskbar: true
  });

  if (app.dock) {
    app.dock.hide();
  }

  tray = new Tray('logo.png');
  tray.setTitle('10:00');

  // Create a context menu for the tray
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click: function() {
        app.quit();
      }
    }
  ]);

  // Only show the context menu on right-click
  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu);
  });

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