var hihat;
var kick;
var snare;
var tom;
var hihatButton;
var kickButton;
var snareButton;
var tomButton;
var isRecording = [false, false, false, false];
var recordChannels = [[], [], [], []];
function main() {
    getElements();
    setListeners();
    createAllChannels();
}
function getElements() {
    hihat = document.querySelector("[data-sound='hihat']");
    kick = document.querySelector("[data-sound='kick']");
    snare = document.querySelector("[data-sound='snare']");
    tom = document.querySelector("[data-sound='tom']");
    hihatButton = document.querySelector("#button_q");
    kickButton = document.querySelector("#button_w");
    snareButton = document.querySelector("#button_e");
    tomButton = document.querySelector("#button_r");
}
function setListeners() {
    document.addEventListener("keypress", onKeyPressed);
    hihatButton.addEventListener("click", onButtonPressed);
    kickButton.addEventListener("click", onButtonPressed);
    snareButton.addEventListener("click", onButtonPressed);
    tomButton.addEventListener("click", onButtonPressed);
}
function createAllChannels() {
    var channels = [];
    for (var i = 0; i < 4; i++) {
        var id = "#channel" + (i + 1);
        channels[i] = document.querySelector(id);
    }
    for (var i = 0; i < 4; i++) {
        createChannelButtons(channels[i], i);
    }
}
function createChannelButtons(div, channelNumber) {
    var buttons = [];
    for (var i = 0; i < 3; i++) {
        buttons[i] = document.createElement("button");
    }
    // Record button
    buttons[0].innerText = "Record";
    buttons[0].dataset.channelNumber = channelNumber + "";
    // Stop button
    buttons[1].innerText = "Stop";
    buttons[1].dataset.channelNumber = channelNumber + "";
    // Play button
    buttons[2].innerText = "Play";
    buttons[2].dataset.channelNumber = channelNumber + "";
    buttons[0].addEventListener("click", onRecordStart);
    buttons[1].addEventListener("click", onRecordStop);
    buttons[2].addEventListener("click", onRecordPlay);
    for (var i = 0; i < 3; i++) {
        div.appendChild(buttons[i]);
    }
}
function onKeyPressed(ev) {
    var key = ev.key;
    var time = ev.timeStamp;
    recordSound(key, time);
    switchKey(key);
}
function onButtonPressed(ev) {
    var key = this.dataset.key;
    var time = ev.timeStamp;
    recordSound(key, time);
    switchKey(key);
}
function switchKey(key) {
    switch (key) {
        case "q":
            playWave(hihat);
            break;
        case "w":
            playWave(kick);
            break;
        case "e":
            playWave(snare);
            break;
        case "r":
            playWave(tom);
            break;
    }
}
function playWave(sound) {
    var item = sound;
    item.currentTime = 0;
    item.play();
}
function recordSound(key, time) {
    for (var i = 0; i < isRecording.length; i++) {
        if (isRecording[i]) {
            recordChannels[i].push(key);
            recordChannels[i].push(time);
        }
    }
}
function playRecordedChannel(channel) {
    var _loop_1 = function (i) {
        var key = recordChannels[channel][i];
        var time = recordChannels[channel][i + 1] - recordChannels[channel][1];
        setTimeout(function () { return switchKey(key); }, time);
    };
    for (var i = 0; i < recordChannels[channel].length; i += 2) {
        _loop_1(i);
    }
}
function onRecordStart() {
    var channel = +this.dataset.channelNumber;
    recordChannels[channel].length = 0;
    console.log("[Record] Started recording on channel: " + (channel + 1) + ".");
    isRecording[channel] = true;
}
function onRecordStop() {
    var channel = +this.dataset.channelNumber;
    console.log("[Record] Stoped recording on channel: " + (channel + 1) + ".");
    isRecording[channel] = false;
    ;
}
function onRecordPlay() {
    var channel = +this.dataset.channelNumber;
    if (!isRecording[channel]) {
        console.log("[Record] Playing recording from channel: " + (channel + 1) + ".");
        playRecordedChannel(channel);
    }
    else {
        console.log("[Record] Fail to play record on channel " + (channel + 1) + ", still recording.");
    }
}
main();
