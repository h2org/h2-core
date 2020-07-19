import { Action, GlobalHotKey } from "../core/abstract-action";
import ContextResource from "../core/context-resource";
import { ActionType } from "../core/types/enums/action-type";
import OutputService from "../outputs/output-service";


export default class YoutubePlayerAction extends Action {

  private output: OutputService;

  constructor(context?: ContextResource) {
    super({
      hotKey: GlobalHotKey.CLIPBOARD_PASTE,
      type: ActionType.CLIPBOARD_TEXT,
    });
    this.output = OutputService.getInstance(context);
  }

  public resolver(context: ContextResource): void {
    const videoId = context.clipboardText.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
    this.output.insertIframe("https://www.youtube.com/embed/" + videoId);
  }

  public canHandle(context: ContextResource) {
    if (!context.clipboardText) {
      return false;
    }
    return context.clipboardText.indexOf("youtube.com") !== -1;
  }
}
