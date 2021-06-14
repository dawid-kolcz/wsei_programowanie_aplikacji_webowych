import { StorageType, globalStorage } from "../config";
import * as FB from "./FB";

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

    getNotesFromFirebase(): void{
        
    }

    getNotesFromStorage(): void{

    }

    deleteNoteFromFirebase(id: string): void{
        
    }

    saveNote(note: Note){
        switch (+globalStorage) {
            case StorageType.Firebase:
                    this.saveNoteToFirebase(note);
                break;
            case StorageType.LocalStorage:
                    this.saveNoteToLocalStorage(note);
                break;
            default:
                break;
        }
    }
    
    saveNoteToFirebase(note: Note): void{
        FB.addNote(note);
    }

    saveNoteToLocalStorage(note: Note): void{

    }

    newNote(): void{
        const newNote = document.createElement("div") as HTMLDivElement;
    
        newNote.className = "note";
        newNote.style.backgroundColor = "yellow";

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
        
        const saveButton = document.createElement("button") as HTMLButtonElement;
        saveButton.innerText = "Save note";
        saveButton.addEventListener("click", () => {
            const note: Note = {
                title: newTitle.value,
                content: newContent.value,
                bgColor: newNote.style.backgroundColor,
                pinned: pinedTick.checked
            }
            this.saveNote(note);
        });

        this.onBGColorClick(blueButton);
        this.onBGColorClick(greenButton);
        this.onBGColorClick(yellowButton);
        this.onBGColorClick(whiteButton);

        buttonWrapper.appendChild(blueButton);
        buttonWrapper.appendChild(greenButton);
        buttonWrapper.appendChild(yellowButton);
        buttonWrapper.appendChild(whiteButton);
        buttonWrapper.appendChild(pinedTick);
        buttonWrapper.appendChild(saveButton);

        newNote.appendChild(newTitle);
        newNote.appendChild(newContent);
        newNote.appendChild(buttonWrapper);
    
        document.querySelector("#notesWrapper").appendChild(newNote);
    }
    
    onBGColorClick(pressedButton: HTMLButtonElement){
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