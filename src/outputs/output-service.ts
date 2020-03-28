import { WebContents } from "electron";
import ContextResource from "../core/context-resource";

export default class OutputService {

    private webContents: WebContents;

    public static get_instance(context?: ContextResource) {
        if (!OutputService.instance) {
            OutputService.instance = new OutputService(context);
        }
        return OutputService.instance;
    }
    
    private static instance: OutputService;

    private constructor(context: ContextResource) {
        this.webContents = context.webContents
    }

    public embedJS(js: string){
        return true
    }

    public loadUrl(url: string){
        return true
    }
}
