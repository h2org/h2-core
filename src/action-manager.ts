import { clipboard, globalShortcut } from "electron";

import activeActions from "./actions";
import { Action, GlobalHotKey } from "./core/abstract-action";
import ContextResource from "./core/context-resource.js";
import { ActionType } from "./core/types/enums/action-type";


interface IActionResource {
  superUser: boolean;
  action: Action;
}
/**
 * A global action manager, which is responsible for listening to
 * actions that can be managed by H2
 *
 * Constructor loads global shortcut key maps and loads actions json
 * addActions() iteractes over all enabled action and creates instance of the action from the action json
 * also, creates key combinations map for enabled extensions.
 *
 * registerGlobals() registers global shortcuts as requested by the actions and ties them with their callback.
 */
class ActionManager {

  /**
   * Get Singleton of Action Manager
   */
  public static getInstance() {
    if (!ActionManager.instance) {
      ActionManager.instance = new ActionManager();
    }
    return ActionManager.instance;
  }

  private static instance: ActionManager;

  private actions: IActionResource[];

  private activeGlobals: { [key in GlobalHotKey]: Action[] };
  private globalHandlers: { [key: string]: () => void };
  private hotKeys: { [key: string]: string[] };
  private areGlobalsDirty: boolean = false;
  private context: ContextResource;

  private constructor() {
    this.hotKeys = {
      CLIPBOARD_PASTE: ["cmd+shift+v", "ctrl+shift+v"],
    };
    this.areGlobalsDirty = true;
    this.activeGlobals = {
      CLIPBOARD_PASTE: [],
    };
    this.globalHandlers = {
      CLIPBOARD_PASTE: () => {
        this.runActions(GlobalHotKey.CLIPBOARD_PASTE);
      },
    };
  }
  public start(context: ContextResource): ActionManager {
    this.actions = activeActions.map((action) => ({
      action: new action(),
      superUser: true,
    }));
    this.context = context;
    if (this.areGlobalsDirty) {
      this.activateActions();
      this.registerGlobals();
    }
    return this;
  }

  public clearGlobals() {
    globalShortcut.unregisterAll();
    this.areGlobalsDirty = Object.keys(this.activeGlobals).length === 0;
  }

  // @TODO: update context based on the action type
  private updateContext() {
    const text = clipboard.readText();
    this.context.setResource({
      content: text,
      type: ActionType.CLIPBOARD_TEXT,
    });
  }

  private runActions(hotKey: GlobalHotKey) {
    this.updateContext();

    this.activeGlobals[hotKey].forEach((action) => {
      if (action.canHandle(this.context)) {
        action.resolver(this.context);
      }
    });
  }

  // internal action registrar
  private activateActions() {
    // 1. mapping global keys
    this.actions.forEach((action) => {
      this.activeGlobals[action.action.hotKey].push(action.action);
    });
    this.areGlobalsDirty = true;
  }

  private registerGlobals() {
    if (Object.keys(this.activeGlobals).length) {
      this.clearGlobals();
    }
    for (const hotKey in this.activeGlobals) {
      if (hotKey in this.activeGlobals) {
        this.hotKeys[hotKey].forEach((keyCombination) => {

          globalShortcut.register(keyCombination, this.globalHandlers[hotKey]);
        });
      }
    }
    this.areGlobalsDirty = false;
  }
}

const manager = ActionManager.getInstance();
export default manager;
