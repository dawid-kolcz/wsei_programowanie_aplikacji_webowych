var PlayingMachine = /** @class */ (function () {
    function PlayingMachine() {
        this.main();
    }
    PlayingMachine.prototype.main = function () {
        this.getAudioElements();
        this.addEventListeners();
    };
    PlayingMachine.prototype.getAudioElements = function () {
        this.hihat = document.querySelector('[data-sound="hihat"]');
        this.kick = document.querySelector("[data-sound='kick']");
        this.snare = document.querySelector("[data-sound='snare']");
        this.tom = document.querySelector("[data-sound='tom']");
    };
    PlayingMachine.prototype.addEventListeners = function () {
        document.addEventListener("keypress", this.keyPressed);
    };
    PlayingMachine.prototype.keyPressed = function (ev) {
        console.log(ev);
        var key = ev.key;
        switch (key) {
            case "q":
                this.playSound(this.hihat);
                break;
        }
    };
    PlayingMachine.prototype.playSound = function (sound) {
        sound.currentTime = 0;
        sound.play();
    };
    return PlayingMachine;
}());
var app = new PlayingMachine();
