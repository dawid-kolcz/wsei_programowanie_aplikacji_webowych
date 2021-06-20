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
        this.notesArray = await JSON.parse(localStorage.getItem("notes"));
        this.notesArray.forEach(element => {
            
        });
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
        let index = this.notesArray.findIndex(x => x.id == note.id);
        this.notesArray.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(this.notesArray));
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
        let i = 0;
        this.notesArray.forEach(e => {
            e.id = i+"";
            i++;
        });
        localStorage.setItem("notes", JSON.stringify(this.notesArray));
    }

    renderSavedNote(note: Note){

    }



    async newNote(){
        const newNote = document.createElement("div") as HTMLDivElement;
    
        newNote.className = "note";
        newNote.style.backgroundColor = "yellow";

        const newTitle = document.createElement("input") as HTMLInputElement;
        newTitle.placeholder = "Title...";
    
        const newContent = document.createElement("input") as HTMLInputElement;
        newContent.placeholder = "All your notes belong here..."
        
        const deleteButton = this.createDeleteButton();
        const editButton = this.createEditButton();
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
        newNote.appendChild(deleteButton);
        newNote.appendChild(editButton);
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
        this.notesArray.push(note)
        await this.saveNote(note);
        
        noteDiv.id = note.id;       
        noteDiv.removeChild(buttonDiv);
        noteDiv.querySelectorAll("input").forEach(element => {
            element.disabled = true;
        })
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
        button.className = "deleteButton";
        button.innerText = "Delete";
        button.addEventListener("click", () => this.onDeleteClick(button));
        return button;
    }

    async onDeleteClick(button: HTMLButtonElement){
        let id = button.parentElement.id;
        let index = this.notesArray.findIndex(e => e.id == id);
        let note = this.notesArray[index];
        console.log("onDeleteClick note:" + note);
        await this.deleteNote(note);
        button.parentElement.parentElement.removeChild(button.parentElement);
    }

    createEditButton(): HTMLButtonElement{
        const button = document.createElement("button") as HTMLButtonElement;
        button.className = "editButton";
        button.innerText = "Edit";
        button.addEventListener("click", () => this.onEditClick(button));
        return button;
    }

    async onEditClick(button: HTMLButtonElement){
        button.parentElement.querySelectorAll("input")
            .forEach(element => element.disabled = false);
    }
}