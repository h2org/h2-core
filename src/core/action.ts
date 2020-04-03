
import { ActionTypes } from "./types/interfaces/action-types";

import OutputService from "../outputs/output-service";

import ContextResource from "./context-resource";

export abstract class Action {

    public type: ActionTypes;
    public subkey: string = "6";
    protected outputService: OutputService;
    public constructor() {
        this.outputService = OutputService.get_instance();
    }

    // subkey: cmd + h + 6
    /**
     * resolver
     */
    public abstract resolver(context: ContextResource | undefined): void;

    // public abstract subKeyHandler(context: ContextResource): void;
}
