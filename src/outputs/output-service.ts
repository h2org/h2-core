import { WebContents } from "electron";

import ContextResource from "../core/context-resource";


// webContents
// mainWindow
export default class OutputService {

    public static getInstance(context?: ContextResource) {
        if (!OutputService.instance) {
            OutputService.instance = new OutputService(context);
        }
        return OutputService.instance;
    }

    private static instance: OutputService;

    private webContents: WebContents;
    private eventHandlers: {
        [key: string]: (args: string[]) => void,
    };

    private constructor(context: ContextResource) {
        this.webContents = context.webContents;
        this.eventHandlers = {};
    }

    public embedJS(js: string) {
        return true;
    }

    public async embedJSUrl(url: string) {
        let js = "var tag = document.createElement('script');";
        js += `tag.src = "${url}";`;
        js += "var firstScriptTag = document.getElementsByTagName('script')[0]";
        js += "firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);";
        await this.webContents.executeJavaScript(js);
    }

    public insertIframe(url: string) {
        this.webContents.send("insertIframe", url);
    }

    public loadUrl(url: string) {
        if ("loadUrl" in this.eventHandlers) {
            if (this.eventHandlers.loadUrl) {
                this.eventHandlers.loadUrl([url]);
            }
        }

        this.webContents.on("did-finish-load", () => {
            this.webContents.insertCSS("body { -webkit-app-region: drag !important; }");
        });
    }
    public setUserAgent(agent: string) {
        this.webContents.setUserAgent(agent);
    }
    public on(event: string, callback: (args: string[]) => void) {
        this.eventHandlers[event] = callback;
        return this;
    }
}
