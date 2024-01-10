const { contextBridge, ipcRenderer } = require("electron");


const totoObjectId = "4c605b6e-b456-4e62-a06d-7e752c81e57f";    // NP-ScrMult/00#-Screen# (!! adjust uniquely per screen / Electron app instance)



contextBridge.exposeInMainWorld("mqttAPI", {
    totoObjectId: totoObjectId,
    onMqttMessage: (callback) => ipcRenderer.on("mqtt", (event, value) => {
        callback(value);   // value is send's second argument
    })
});