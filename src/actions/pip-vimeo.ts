import { Action } from "../core/action";
import ContextResource from "../core/context-resource";
import ServiceManager from "../core/service-manager";

export default class YoutubePlayerAction extends Action {


  public resolver(context: ContextResource): void {
    ServiceManager.getyoutubeplayerservice().bhaadmejao('chaladomera gana')
  }
}