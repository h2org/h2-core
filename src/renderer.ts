import { ipcRenderer } from "electron";

// rendererfile for the view
ipcRenderer.on("insertIframe", (_, arg) => {
    document.getElementById("video").innerHTML = `<iframe src="${arg}"></iframe>`;
});
