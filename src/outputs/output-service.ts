import { WebContents } from "electron";

import ContextResource from "../core/context-resource";

export default class OutputService {

    public static getInstance(context?: ContextResource) {
        if (!OutputService.instance) {
            OutputService.instance = new OutputService(context);
        }
        return OutputService.instance;
    }

    private static instance: OutputService;

    private webContents: WebContents;

    private constructor(context: ContextResource) {
        this.webContents = context.webContents;
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
        return true;
    }
}
