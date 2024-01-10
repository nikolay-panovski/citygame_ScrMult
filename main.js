const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const env = require("dotenv");

const mqtt = require("mqtt");
const totoRepoId = "e0c1defb-c75d-4c3b-8ef2-69d7ec8e224c";      // City and City
const totoHubId = "2e44ba80-6d28-4dac-a365-75cdb0fa7ebc";       // NP-ScrMult/100-SignalHub

env.config();   // get variables from .env file into "process.env"

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
  
    win.loadFile('index.html');
}

function doMqttConnect() {
    const client = mqtt.connect("tls://mqtt.toto.io:8883", {
        //rejectUnauthorized: false,
        username: process.env.TOTO_OBJECTS_USERNAME,     // for some reason does not get transmitted from .env
        password: process.env.TOTO_OBJECTS_PASSWORD,
    });


    client.on('connect', () => {
        client.subscribe('toto/' + totoRepoId + '/' + totoHubId + '/in' );
    });
      

    client.on('message', (topic, message) => {
        // send message as received, renderer uses ids to filter it and deal with it
        win.webContents.send("mqtt", message.toString());
    });
      
    // Handle disconnects
    client.on('close', () => {
        client.end();
        process.exit();
    });
}
  

app.whenReady().then(() => {
    createWindow();
    doMqttConnect();
});

