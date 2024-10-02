const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;

async function createWindow() {
  const isDev = (await import('electron-is-dev')).default;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, 
      contextIsolation: true, 
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }
}

app.on('ready', () => {
  createWindow();
});


/* 
   Listen for and notify users about the availability of a new update.
   Once the update is downloaded it will automatically install the update and restart the application.
*/ 

autoUpdater.on('update-available', () => {
  console.log('A new update is available');
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded; will install now');
  mainWindow.webContents.send('update_downloaded');
  autoUpdater.quitAndInstall();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
 