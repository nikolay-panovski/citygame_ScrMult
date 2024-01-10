
const body = document.getElementById("body");

window.mqttAPI.onMqttMessage((message) => {
    if (message === window.mqttAPI.totoObjectId) {
        body.style.backgroundImage = "url(./imgs/EuropeSquare_BOTTOM_LEFT.png)";
    }
    else {
        body.style.backgroundImage = "none";
    }
});