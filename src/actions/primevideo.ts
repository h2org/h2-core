import { Action, GlobalHotKey } from "../core/abstract-action";
import ContextResource from "../core/context-resource";
import { ActionType } from "../core/types/enums/action-type";
import OutputService from "../outputs/output-service";


export default class PrimeVideoPlayerAction extends Action {

    private output: OutputService;

    constructor(context?: ContextResource) {
        super({
            hotKey: GlobalHotKey.CLIPBOARD_PASTE,
            type: ActionType.CLIPBOARD_TEXT,
        });
        this.output = OutputService.getInstance(context);
    }

    public resolver(context: ContextResource): void {
        this.output.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
        );
        this.output.loadUrl(context.clipboardText);
    }

    public canHandle(context: ContextResource) {
        return context.clipboardText?.indexOf("primevideo.com") !== -1;
    }
}
