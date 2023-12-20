
// INSTEAD:
// get browser tab image
// render the actual image or full black depending on MQTT messaging
const information = document.getElementById('info');
information.innerText = "Hold on,";
/*`This app is using Chrome (v${tutorial.chrome()}), Node.js (v${tutorial.node()}), and Electron (v${tutorial.electron()})`*/


/**
const func = async () => {
    const response = await window.tutorial.ping();
    console.log(response); // prints out 'pong'
}
/**/

window.mqttAPI.onMqttMessage((message) => {
    console.log("Message at renderer: ");
    console.log(message);
    
    if (message === window.mqttAPI.totoObjectId) {
        console.log("Good! Now add the image");
        // set relevant document image element to proper source / full opacity
    }
    else {
        console.log("Fine! Page should go black");
        // set relevant document image element to black
    }
});