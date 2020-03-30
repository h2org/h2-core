import { BrowserWindowConstructorOptions } from "electron";

export const config: BrowserWindowConstructorOptions = {

    // dimensions of default BrowserWindow
    height: 300,
    width: 400,

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

};
