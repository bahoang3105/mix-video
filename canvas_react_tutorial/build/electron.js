const { app, BrowserWindow, dialog, ipcMain, shell, Notification, } = require('electron');
const path = require('path');
const url = require('url');
const os = require('os-utils');

let mainWindow;

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('mix-video', process.execPath, [path.resolve(process.argv[1])]);
  }
} else {
  app.setAsDefaultProtocolClient('mix-video');
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.webContents.executeJavaScript(`
        var newLiveId = '${getLiveId(commandLine)}';
        if(window.localStorage.getItem('liveId') !== newLiveId && newLiveId) {
          window.localStorage.setItem('liveId', newLiveId);
          window.location.reload();
        }
      `);
      mainWindow.focus();
    }
  });

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow();
    mainWindow.webContents.executeJavaScript(`window.localStorage.setItem('liveId', '${getLiveId(process.argv) ? getLiveId(process.argv) : 1}')`);
    setInterval(() => {
      os.cpuUsage((v) => {
        mainWindow.webContents.send('cpu', v * 100);
      });
    }, 2000);
  });
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    }
  });
  mainWindow.maximize();
  mainWindow.show();
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle window controls via IPC
ipcMain.on('shell:open', () => {
  const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked');
  const pagePath = path.join('file://', pageDirectory, 'index.html');
  shell.openExternal(pagePath);
});

ipcMain.on('notifyCPU', () => {
  new Notification({ title: 'Warning!!!', body: 'CPU is working close to overload' }).show();
});

const getLiveId = (agrv) => {
  for(const i of agrv) {
    if(i.indexOf('mix-video://liveId=') === 0) {
      return i.replace('mix-video://liveId=', '');
    }
  }
}