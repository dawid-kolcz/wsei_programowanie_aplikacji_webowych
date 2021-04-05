let hihat : HTMLAudioElement;
let kick : HTMLAudioElement;
let snare : HTMLAudioElement;
let tom : HTMLAudioElement;

let hihatButton : HTMLButtonElement;
let kickButton : HTMLButtonElement;
let snareButton : HTMLButtonElement;
let tomButton : HTMLButtonElement;

let isRecording : boolean[] = [false, false, false, false];
const recordChannels : any[][] = [[],[],[],[]];

function main(): void{
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

function setListeners(): void{
    document.addEventListener("keypress", onKeyPressed);
    hihatButton.addEventListener("click", onButtonPressed);
    kickButton.addEventListener("click", onButtonPressed);
    snareButton.addEventListener("click", onButtonPressed);
    tomButton.addEventListener("click", onButtonPressed);
}

function createAllChannels(): void{
    let channels: HTMLDivElement[] = [];
    for(let i = 0; i < 4; i++){
        const id = "#channel" + (i + 1);
        channels[i] = document.querySelector(id);
    }
    for(let i = 0; i < 4; i++){
       createChannelButtons(channels[i], i); 
    }
}

function createChannelButtons(div: HTMLDivElement, channelNumber: number): void{
    const buttons: HTMLButtonElement[] = [];
    for(let i = 0; i < 3; i++){
        buttons[i] = document.createElement("button");
    }
    // Record button
    buttons[0].innerText = "Record";
    buttons[0].dataset.channelNumber = channelNumber+""; 

    // Stop button
    buttons[1].innerText = "Stop";
    buttons[1].dataset.channelNumber = channelNumber+"";

    // Play button
    buttons[2].innerText = "Play";
    buttons[2].dataset.channelNumber = channelNumber+"";

    buttons[0].addEventListener("click", onRecordStart);
    buttons[1].addEventListener("click", onRecordStop);
    buttons[2].addEventListener("click", onRecordPlay);

    for(let i = 0; i < 3; i++){
        div.appendChild(buttons[i]);
    }
}

function onKeyPressed(ev: KeyboardEvent): void{
    const key = ev.key;
    const time = ev.timeStamp;
    recordSound(key, time);    
    switchKey(key);
}

function onButtonPressed(ev: Event): void{
    const key = this.dataset.key;
    const time = ev.timeStamp;
    recordSound(key, time);    
    switchKey(key);
}
    
function switchKey(key: string) {
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

function playWave(sound: HTMLAudioElement): void{
    let item = sound as HTMLAudioElement;
    item.currentTime = 0;
    item.play();
}

function recordSound(key: string, time: number): void{
    for(let i = 0; i < isRecording.length; i++){
        if(isRecording[i]){
            recordChannels[i].push(key);
            recordChannels[i].push(time);
        }
    }
}

function playRecordedChannel(channel: number){
    for(let i = 0; i < recordChannels[channel].length; i+=2){
        let key: string = recordChannels[channel][i];
        let time: number = recordChannels[channel][i+1] - recordChannels[channel][1];

        setTimeout(() => switchKey(key), time);
    }
}

function onRecordStart(): void{
    const channel: number = +this.dataset.channelNumber;
    recordChannels[channel].length = 0;
    console.log(`[Record] Started recording on channel: ${channel+1}.`);
    isRecording[channel] = true;    
}

function onRecordStop(): void{
    const channel: number = +this.dataset.channelNumber;
    console.log(`[Record] Stoped recording on channel: ${channel+1}.`);
    isRecording[channel] = false;;    
}

function onRecordPlay(): void{
    const channel: number = +this.dataset.channelNumber;
    if(!isRecording[channel]){
        console.log(`[Record] Playing recording from channel: ${channel+1}.`);
        playRecordedChannel(channel);
    }
    else{
        console.log(`[Record] Fail to play record on channel ${channel+1}, still recording.`);
    }
}
main();