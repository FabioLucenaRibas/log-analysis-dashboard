import { app, BrowserWindow, ipcMain, screen, shell } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

const ipc = ipcMain;
let win: BrowserWindow;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve'),
  dev = args.some(val => val === '--dev'),
  openDevTools = args.some(val => val === '--openDevTools');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    width: 1600,
    height: 800,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      allowRunningInsecureContent: (serve) ? true : false,
      nodeIntegrationInSubFrames: true,
      webSecurity: false,
      webviewTag: true,
      // contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });

  if (openDevTools) {
    win.webContents.openDevTools();
  }

  ipc.on('minimizeApp', () => {
    win.minimize();
  });

  ipc.on('maximizeRestoreApp', () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });

  ipc.on('closeApp', () => {
    win.close();
  });

  win.on('maximize', () => {
    win.webContents.send('isMaximize');
  });

  win.on('unmaximize', () => {
    win.webContents.send('isRestored');
  });

  if (serve) {
    win.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: require(path.join(__dirname, '/../node_modules/electron'))
    });
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, 'home/index.html'))) {
      // Path when running electron in local folder
      pathIndex = 'home/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true,
      query: { isdev: dev, opendevtools: openDevTools }
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win.destroy();
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
    if (contents.getType() === 'webview') {
      contents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' }
      })
    }
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
