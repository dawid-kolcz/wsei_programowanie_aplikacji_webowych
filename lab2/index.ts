class PlayingMachine{
    private hihat: HTMLAudioElement = document.querySelector("[data-sound='hihat']");
    private kick: HTMLAudioElement = document.querySelector("[data-sound='kick']");
    private snare: HTMLAudioElement = document.querySelector("[data-sound='snare']");
    private tom: HTMLAudioElement = document.querySelector("[data-sound='tom']");

    constructor(){
        this.main();
    }

    main(): void{
        this.addEventListeners();
    }

    addEventListeners(): void{
        document.addEventListener("keypress", this.keyPressed);
    }

    keyPressed(ev: KeyboardEvent): void{
        console.log(ev);
        const key = ev.key;
        this.kick.play();
        switch (key){
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
    }    
    
    private playWave(sound: HTMLAudioElement): void{
        const item: HTMLAudioElement = sound;
        item.currentTime = 0;
        item.play();
    }
}

const playinMachine = new PlayingMachine();