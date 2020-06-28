import ContextResource from "./context-resource";
import { ActionType } from "./types/enums/action-type";

export enum GlobalHotKey {
    CLIPBOARD_PASTE = "CLIPBOARD_PASTE",
}

export abstract class Action {

    // Global Hot Key action that can trigger this action
    public hotKey: GlobalHotKey;

    // defines what kind of resource is handled by action
    public type: ActionType;

    // this is sub key to specifically call this action
    // can be ingnored in future for public extensions
    protected subKey: string | null;

    // can be ignored for public actions
    protected priority: number = 0;

    // protected outputService: OutputService;
    public constructor({
        type,
        hotKey,

    }: {
        type: ActionType,
        hotKey: GlobalHotKey,
    }) {
        this.hotKey = hotKey;
        this.type = type;
        // this.outputService = OutputService.getInstance();
    }

    // subkey: cmd + h + 6
    // public abstract subKeyHandler(context: ContextResource): void;

    /**
     * resolver
     */
    public abstract resolver(context: ContextResource | undefined): void;

    /**
     * Tells that the current input can be handled by this action
     * For conflicts, manager can decide based on priority
     */
    public abstract canHandle(context: ContextResource): boolean;

}
