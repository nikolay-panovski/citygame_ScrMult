const { contextBridge, ipcRenderer } = require("electron");
const env = require("dotenv");

env.config();


const totoObjectId = process.env.THIS_TOTO_OBJ_ID;    // NP-ScrMult/00#-Screen# (!! adjust uniquely per screen / Electron app instance)



contextBridge.exposeInMainWorld("mqttAPI", {
    totoObjectId: totoObjectId,
    onMqttMessage: (callback) => ipcRenderer.on("mqtt", (event, value) => {
        callback(value);   // value is send's second argument
    })
});