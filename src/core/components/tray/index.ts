import { Menu, Tray } from "electron";

export interface IComponentArgs {
    iconPath: string;
}

let tray: Tray | null = null;

export default (args: IComponentArgs) => {

    return {
        create() {
            if (tray === null) {
                tray = new Tray(args.iconPath);
            }
            const contextMenu = Menu.buildFromTemplate([
                { label: "Quit", type: "radio" },
            ]);
            tray.setToolTip("H2");
            tray.setContextMenu(contextMenu);
        },
        destroy() {
            if (tray !== null) {
                tray.destroy();
            }
        },
    };

};
