const { contextBridge, ipcRenderer } = require("electron");


const totoObjectId = "4c605b6e-b456-4e62-a06d-7e752c81e57f";    // NP-ScrMult/00#-Screen# (!! adjust uniquely per screen / Electron app instance)


contextBridge.exposeInMainWorld('tutorial', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke("ping")
});

contextBridge.exposeInMainWorld("mqttAPI", {
    totoObjectId: totoObjectId,
    onMqttMessage: (callback) => ipcRenderer.on("mqtt", (event, value) => {
        callback(value);   // value is send's second argument
    })
});