
const body = document.getElementById("body");

window.mqttAPI.onMqttMessage((message) => {
    console.log("Message at renderer: ");
    console.log(message);
    
    if (message === window.mqttAPI.totoObjectId) {
        console.log("Good! Now add the image");
        body.style.backgroundImage = "url(./image.png)";
    }
    else {
        console.log("Fine! Page should go black");
        body.style.backgroundImage = "none";
    }
});