import { StorageType, globalStorage } from "../config";
import * as FB from "./FB";

export interface Note{
    id: string,
    title: string,    
    content: string,
    bgColor: string,
    pinned: boolean,
}

export class Notes{
    notesArray: Array<Note> = [];

    async getNotes(){
        switch (+globalStorage) {
            case StorageType.Firebase:
                await this.getNotesFromFirebase();
                break;
            case StorageType.LocalStorage:
                await this.getNotesFromStorage();
                break;
            default:
                break;
        }
    }

    async getNotesFromFirebase(){
        
    }

    async getNotesFromStorage(){

    }

    async deleteNote(note: Note){
        switch(+globalStorage){
            case StorageType.Firebase:
                await this.deleteNoteFromFirebase(note);
                break;
            case StorageType.LocalStorage:
                await this.deleteNoteFromStorage(note);
                break;
            default:
        }
    }

    async deleteNoteFromFirebase(note: Note){
        await FB.deleteNote(note.id);
        let index = this.notesArray.findIndex(x => x.id == note.id);
        this.notesArray.splice(index, 1);
    }

    async deleteNoteFromStorage(note: Note){
        let stored: Array<Note> = JSON.parse(localStorage.getItem("notes"));
        let index = stored.findIndex(x => x.id == note.id);
        stored.splice(index, 1);
        this.notesArray.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(stored))
    }

    async saveNote(note: Note){
        switch (+globalStorage) {
            case StorageType.Firebase:
                await this.saveNoteToFirebase(note);
                break;
            case StorageType.LocalStorage:
                await this.saveNoteToLocalStorage(note);
                break;
            default:
                break;
        }
    }
    // Save note to database and assign note an ID.
    async saveNoteToFirebase(note: Note){
        await FB.addNote(note).then( id => note.id = id);
    }

    async saveNoteToLocalStorage(note: Note){
        let id = this.notesArray.length + 1;
        note.id = id+"";
        let stored = localStorage.getItem("notes");
        if(stored == null) stored = "";
        stored += JSON.stringify(note);
        localStorage.setItem("notes", stored);
    }

    async newNote(){
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
            this.onSaveClick(newTitle.value, newContent.value, 
                newNote.style.backgroundColor, pinedTick.checked, 
                newNote, buttonWrapper)
        });

        this.onBGColorClick(blueButton, newNote);
        this.onBGColorClick(greenButton, newNote);
        this.onBGColorClick(yellowButton, newNote);
        this.onBGColorClick(whiteButton, newNote);

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
    
    async onSaveClick(title: string, content: string, bg: string, pin: boolean,
            noteDiv: HTMLDivElement, buttonDiv: HTMLDivElement){
        
        const note: Note = {
            id: "",
            title: title,
            content: content,
            bgColor: bg,
            pinned: pin,
        }
        await this.saveNote(note);
        noteDiv.id = note.id;       
        this.notesArray.push(note)
        noteDiv.removeChild(buttonDiv);
        
    }

    onBGColorClick(pressedButton: HTMLButtonElement, noteDiv: HTMLDivElement){
        pressedButton.addEventListener("click", () =>{
            noteDiv.style.backgroundColor = pressedButton.dataset.color;
        });
    }
    
    createColorButton(classname: string, bgcolor: string): HTMLButtonElement{
        const button = document.createElement("button") as HTMLButtonElement;
        button.className = classname;
        button.dataset.color = bgcolor;
        return button;
    }

    createDeleteButton(): HTMLButtonElement{
        const button = document.createElement("button") as HTMLButtonElement;
        button.addEventListener("click", () => this.onDeleteClick());
        return button;
    }

    async onDeleteClick(){
        
    }
}