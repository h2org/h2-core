import { Action, GlobalHotKey } from "../core/abstract-action";
import ContextResource from "../core/context-resource";
import { ActionType } from "../core/types/enums/action-type";
import OutputService from "../outputs/output-service";


export default class NetflixPlayerAction extends Action {

    private output: OutputService;

    constructor(context?: ContextResource) {
        super({
            hotKey: GlobalHotKey.CLIPBOARD_PASTE,
            type: ActionType.CLIPBOARD_TEXT,
        });
        this.output = OutputService.getInstance(context);
    }

    public resolver(context: ContextResource): void {
        this.output.loadUrl(context.clipboardText);
    }

    public canHandle(context: ContextResource) {
        return context.clipboardText?.indexOf("meet.google.com") !== -1;
    }
}
