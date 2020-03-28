import { ContextResource } from "../core/context-resource";
import { ActionTypes } from "./types/interfaces/action-types";
import OutputService from "../outputs/output-service";

export abstract class Action {

    public type: ActionTypes;
    protected outputService: OutputService;

    public constructor() {
        this.outputService = OutputService.get_instance()
    }

    // subkey: cmd + h + 6
    public subkey: string = "6";
    /**
     * resolver
     */
    public abstract resolver(context: ContextResource | undefined): void;

    // public abstract subKeyHandler(context: ContextResource): void;
}
