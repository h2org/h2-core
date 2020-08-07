import { BrowserWindowConstructorOptions } from "electron";

export const config: BrowserWindowConstructorOptions = {

    // dimensions of default BrowserWindow
    height: 300,
    width: 400,

    // position
    x: 100,
    y: 0,

    /**
     * disable frame only for non darwin process
     * for darwin, use titleBarStyle as hidden
     */
    frame: process.platform === "darwin" ? false : true,
    titleBarStyle: process.platform === "darwin" ? "customButtonsOnHover" : "default",

    // picture-in-picture always on by default
    alwaysOnTop: true,

    // to avoid any possible conflicts with picture in picture
    fullscreenable: false,

    // experimental for linux OS
    focusable: true,

    // let's support eyes by default
    darkTheme: true,

    webPreferences: {
        nodeIntegration: false,
        partition: "persist:h2Main",
        plugins: true,
        sandbox: true,
    },

};
