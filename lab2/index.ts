class PlayingMachine{
    hihat: HTMLAudioElement;
    kick: HTMLAudioElement;
    snare: HTMLAudioElement;
    tom: HTMLAudioElement;

    constructor(){
        this.main();
    }

    main(): void{
        this.getAudioElements();
        this.addEventListeners();
    }

    getAudioElements(): void{
        this.hihat = document.querySelector('[data-sound="hihat"]');
        this.kick = document.querySelector("[data-sound='kick']");
        this.snare = document.querySelector("[data-sound='snare']");
        this.tom = document.querySelector("[data-sound='tom']");
    }

    addEventListeners(): void{
        document.addEventListener("keypress", this.keyPressed);
    }
    
    keyPressed(ev: KeyboardEvent): void{
        console.log(ev);
        const key = ev.key;

        switch (key){
            case "q":
                this.playSound(this.hihat);
                break;
        }
    }

    playSound(sound: HTMLAudioElement): void{
        sound.currentTime = 0;
        sound.play();
    }
}

const app = new PlayingMachine();