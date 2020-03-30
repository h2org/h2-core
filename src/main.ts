import { app, BrowserWindow, BrowserWindowConstructorOptions, globalShortcut, ipcMain, Menu, session, Tray } from "electron";
import * as path from "path";

import ActionManager from "./core/action-manager";
import ContextResource from "./core/context-resource";

import {config as browserWindowConfig} from "./config/browser-window";

let mainWindow: BrowserWindow = null;
const tray: Tray;

const createWindow = () => {


  // Create the browser window.
  mainWindow = new BrowserWindow(browserWindowConfig);
  mainWindow.setMenu(null);

  if (process.platform === "darwin") { app.dock.hide(); }

  mainWindow.setVisibleOnAllWorkspaces(true);

  // and load the index.html of the app.
  mainWindow.loadFile("src/index.html");

  // Open the DevTools.
  if (process.env.DEV === "1") { mainWindow.webContents.openDevTools(); }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Disable new browser windows and popups
  mainWindow.webContents.on("new-window", (e: any, url: string) => {
    e.preventDefault();
    mainWindow.focus();
  });

  // DEPRECATED, Doesn't Work. TODO: Test before removing
  // globalShortcut.register("Alt+Shift+T", () => {
  //   // brings the window to top always
  //   utils.resetWindowToFloat(mainWindow);
  // });
};

const createMenuTray = () => {
  // tray = new Tray(__dirname + "/assets/images/tray.png");

  // // const trayMenus = [
  // //   { role: "about" },
  // //   {
  // //     label: "Exit Fullscreen",
  // //     click() {
  // //       fullscreenToggle(mainWindow, true);
  // //     },
  // //   },
  // //   {
  // //     label: "Quit",
  // //     click() {
  // //       app.quit();
  // //     },
  // //   },
  // //   {
  // //     label: "Bring H2 to the front",
  // //     click() {
  // //       utils.resetWindowToFloat(mainWindow);
  // //     },
  // //   },
  // // ];

  // // const contextMenu = Menu.buildFromTemplate(trayMenus);

  // tray.setToolTip("H2");
  // // tray.setContextMenu(contextMenu);
  // tray.setTitle("H2");
  // tray.on("click", (event) => {
  //   !mainWindow.isFocused() ? mainWindow.focus() : true;
  // });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on("ready", () => {
  session.defaultSession.clearStorageData();

  createWindow();
  // createMenuTray();

  const context = new ContextResource({
    platform: "generic",
    webContents: mainWindow.webContents,
  });
  ActionManager.start(context);
});

app.on("will-quit", () => {
  // Unregister all shortcuts.
  ActionManager.clearGlobals();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// If there is any hyper link on the existing page then avoid
// loading a new page. @TODO: try to use remote from renderer
ipcMain.on("openLink", (ev: any, arg: string) => {
  mainWindow.loadURL(arg);
  mainWindow.webContents.on("did-finish-load", (event: any, url: string) => {
    mainWindow.webContents.send("send-full-screen", "ping");
  });
});
