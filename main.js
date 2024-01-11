const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const env = require("dotenv");

const mqtt = require("mqtt");

env.config();   // get variables from .env file into "process.env"


const totoRepoId = process.env.TOTO_REPO_ID;
const totoHubId = process.env.TOTO_HUB_ID;

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
  
    win.removeMenu();   // Windows and Linux only; https://stackoverflow.com/a/39092033
    win.loadFile('index.html');
}

function doMqttConnect() {
    const client = mqtt.connect("tls://mqtt.toto.io:8883", {
        username: process.env.TOTO_OBJECTS_USERNAME,
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

