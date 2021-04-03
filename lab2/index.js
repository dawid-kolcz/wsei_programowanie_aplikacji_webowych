var PlayingMachine = /** @class */ (function () {
    function PlayingMachine() {
        this.hihat = document.querySelector("[data-sound='hihat']");
        this.kick = document.querySelector("[data-sound='kick']");
        this.snare = document.querySelector("[data-sound='snare']");
        this.tom = document.querySelector("[data-sound='tom']");
        this.main();
    }
    PlayingMachine.prototype.main = function () {
        this.addEventListeners();
    };
    PlayingMachine.prototype.addEventListeners = function () {
        document.addEventListener("keypress", this.keyPressed);
    };
    PlayingMachine.prototype.keyPressed = function (ev) {
        console.log(ev);
        var key = ev.key;
        this.kick.play();
        switch (key) {
            case "q":
                this.playWave(this.hihat);
                break;
            case "w":
                this.kick.play();
                break;
            case "e":
                this.playWave(this.snare);
                break;
            case "r":
                this.playWave(this.tom);
                break;
        }
    };
    PlayingMachine.prototype.playWave = function (sound) {
        var item = sound;
        item.currentTime = 0;
        item.play();
    };
    return PlayingMachine;
}());
var playinMachine = new PlayingMachine();
