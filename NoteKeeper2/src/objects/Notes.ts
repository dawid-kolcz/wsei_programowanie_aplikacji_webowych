export interface Note{
    title: string,    
    content: string,
    bgColor: string,
    pinned: boolean,
}

export interface NoteWithID{
    id: string;
    data: Note;
}

export class Notes{
    notesArray: Array<NoteWithID> = [];

    saveNote(note: Note): Note{
        return null;
    }
    
    newNote(): void{
        const newNote = document.createElement("div") as HTMLDivElement;
    
        newNote.className = "note";
    
        const newTitle = document.createElement("input") as HTMLInputElement;
        newTitle.placeholder = "Title...";
    
        const newContent = document.createElement("input") as HTMLInputElement;
        newContent.placeholder = "All your notes belong here..."
    
        const buttonWrapper = document.createElement("div") as HTMLDivElement;
        
        const blueButton   = this.createColorButton("lightblueBGButton", "blue");
        const greenButton  = this.createColorButton("greenBGButton", "green");
        const yellowButton = this.createColorButton("yellowBGButton", "yellow");
        const whiteButton  = this.createColorButton("whiteBGButton", "white");
    
        const pinedTick = document.createElement("input") as HTMLInputElement;
        pinedTick.type = "checkbox";
        
        this.switchBGColorListener(blueButton);
        this.switchBGColorListener(greenButton);
        this.switchBGColorListener(yellowButton);
        this.switchBGColorListener(whiteButton);
    
        buttonWrapper.appendChild(blueButton);
        buttonWrapper.appendChild(greenButton);
        buttonWrapper.appendChild(yellowButton);
        buttonWrapper.appendChild(whiteButton);
        buttonWrapper.appendChild(pinedTick);
    
        newNote.appendChild(newTitle);
        newNote.appendChild(newContent);
        newNote.appendChild(buttonWrapper);
    
        document.querySelector("#notesWrapper").appendChild(newNote);
    }
    
    switchBGColorListener(pressedButton: HTMLButtonElement){
        pressedButton.addEventListener("click", () =>{
            pressedButton.parentElement.parentElement.style.backgroundColor = pressedButton.dataset.color;
        });
    }
    
    createColorButton(classname: string, bgcolor: string): HTMLButtonElement{
        const button = document.createElement("button") as HTMLButtonElement;
        button.className = classname;
        button.dataset.color = bgcolor;
        return button;
    }
}