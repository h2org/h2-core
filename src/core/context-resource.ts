import { WebContents } from "electron";

import { ActionType } from "./types/enums/action-type";

interface IClipboardTextResource {
    type: ActionType.CLIPBOARD_TEXT;
    content: string;
}
interface IClipboardImageResource {
    type: ActionType.CLIPBOARD_IMAGE;
    content: Blob;
}
type ResourceContent = IClipboardTextResource | IClipboardImageResource;

export default class ContextResource {


    // @TODO it should be enum/class of supported platforms
    public platform: string;

    // will be available only to authorized output service
    public webContents?: WebContents;

    // one of these will be available based on the action type
    public clipboardText?: string;
    public clipboardImage?: Blob;

    constructor(data: {
        platform: string | undefined,
        webContents: WebContents,
    }) {
        this.webContents = data.webContents;
    }

    public setResource(content: ResourceContent) {
        switch (content.type) {
            case ActionType.CLIPBOARD_IMAGE:
                this.clipboardImage = content.content;
                break;
            case ActionType.CLIPBOARD_TEXT:
                this.clipboardText = content.content;
                break;
            default:
                throw new Error("Invalid Resource Type");
        }
    }
}
