import { Action } from "../core/action";
import ContextResource from "../core/context-resource";


export default class YoutubePlayerAction extends Action {
  public resolver(context: ContextResource): void {    
    this.outputService.embedJS("");
    // this.outputService.fullScreen();
  }
}