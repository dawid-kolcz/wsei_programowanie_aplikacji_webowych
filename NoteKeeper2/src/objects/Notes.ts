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
        const notesFromDB = await FB.getNotes();
        notesFromDB.forEach(element => {
            this.notesArray.push(<Note>element);
        });
        this.createNotesFromArray();
        }

    async getNotesFromStorage(){
        this.notesArray = await JSON.parse(localStorage.getItem("notes"));
        this.createNotesFromArray();
    }

    createNotesFromArray(){
        this.notesArray.forEach(element => {
            const newNote = this.newNote();
            this.changeNoteValues(newNote, element);
        });
    }

    async updateNote(id: string, note: Note){
        switch (+globalStorage) {
            case StorageType.Firebase:
                    await this.updateNoteFirebase(id, note);
                break;
            case StorageType.LocalStorage:
                    await this.updateNoteStorage(id, note);
                break;
            default:
                break;
        }
    }

    async updateNoteFirebase(id: string, note: Note){
        const index = this.notesArray.findIndex( e => e.id == note.id );
        this.notesArray[index] = note;
 
        FB.updateNote(id, note);
    }

    async updateNoteStorage(id: string, note:Note){
        const index = this.notesArray.findIndex( e => e.id == note.id );
        this.notesArray[index] = note;
        
        localStorage.setItem("notes", JSON.stringify(this.notesArray));
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
        await FB.updateNote(note.id, note);
    }

    async saveNoteToLocalStorage(note: Note){
        let i = 0;
        this.notesArray.forEach(e => {
            e.id = i+"";
            i++;
        });
        localStorage.setItem("notes", JSON.stringify(this.notesArray));
    }

    newNote(): HTMLDivElement{
        const newNote = document.createElement("div") as HTMLDivElement;
    
        newNote.className = "note";
        newNote.style.backgroundColor = "yellow";

        const newTitle = document.createElement("input") as HTMLInputElement;
        newTitle.className = "noteTitle"
        newTitle.placeholder = "Title...";
        
        const newContent = document.createElement("input") as HTMLInputElement;
        newContent.className = "noteContent";
        newContent.placeholder = "All your notes belong here..."
        
        const deleteButton = this.createDeleteButton();
        const editButton = this.createEditButton();

        const buttonWrapper = document.createElement("div") as HTMLDivElement;
        buttonWrapper.className = "buttonWrapper";
        
        const blueButton   = this.createColorButton("lightblueBGButton", "blue");
        const greenButton  = this.createColorButton("greenBGButton", "green");
        const yellowButton = this.createColorButton("yellowBGButton", "yellow");
        const whiteButton  = this.createColorButton("whiteBGButton", "white");
    
        const pinedTick = document.createElement("input") as HTMLInputElement;
        pinedTick.type = "checkbox";
        pinedTick.className = "pinnedNote";
        pinedTick.addEventListener("click", (event) => this.onPinClick(event));

        const saveButton = document.createElement("button") as HTMLButtonElement;
        saveButton.innerText = "Save note";
        saveButton.addEventListener("click", (event) => this.onSaveClick(event));

        this.onBGColorClick(blueButton, newNote);
        this.onBGColorClick(greenButton, newNote);
        this.onBGColorClick(yellowButton, newNote);
        this.onBGColorClick(whiteButton, newNote);

        buttonWrapper.appendChild(blueButton);
        buttonWrapper.appendChild(greenButton);
        buttonWrapper.appendChild(yellowButton);
        buttonWrapper.appendChild(whiteButton);
        buttonWrapper.appendChild(saveButton);

        newNote.appendChild(newTitle);
        newNote.appendChild(newContent);
        newNote.appendChild(deleteButton);
        newNote.appendChild(editButton);
        newNote.appendChild(pinedTick);
        newNote.appendChild(buttonWrapper);
        
        pinedTick.checked ? 
            document.querySelector("#pinnedWrapper").appendChild(newNote) :
            document.querySelector("#notesWrapper").appendChild(newNote)
        
        return newNote;
    }
    
    async onSaveClick(event: Event){
        const element = <HTMLElement>event.target;
        const noteDiv = element.parentElement.parentElement;

        const title = noteDiv.querySelector(".noteTitle") as HTMLInputElement;
        const content = noteDiv.querySelector(".noteContent") as HTMLInputElement;
        const pined = noteDiv.querySelector(".pinnedNote") as HTMLInputElement;

        const note: Note = {
            id: "",
            title: title.value,
            content: content.value,
            bgColor: noteDiv.style.backgroundColor,
            pinned: pined.checked,
        }
        this.notesArray.push(note)
        await this.saveNote(note);
        
        noteDiv.id = note.id;       
        noteDiv.removeChild(element.parentElement);
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
        button.addEventListener("click", (event) => this.onDeleteClick(event));
        return button;
    }

    async onDeleteClick(event: Event){
        const element = <HTMLElement>event.target;
        let id = element.parentElement.id;
        let index = this.notesArray.findIndex(e => e.id == id);
        let note = this.notesArray[index];
        await this.deleteNote(note);
        element.parentElement.parentElement.removeChild(element.parentElement);
    }

    createEditButton(): HTMLButtonElement{
        const button = document.createElement("button") as HTMLButtonElement;
        button.className = "editButton";
        button.innerText = "Edit";
        button.addEventListener("click", (event) => this.onEditClick(event));
        return button;
    }

    async onEditClick(event: Event){
        const element = <HTMLElement>event.target;
        const inputs = element.parentElement.querySelectorAll("input");
        const editButton = element.parentElement.querySelector(".editButton") as HTMLButtonElement;

        if(inputs[0].disabled = true && inputs[1].disabled == true){
            inputs.forEach(e => e.disabled = false);
            editButton.innerText = "Save";
        }else{
            inputs.forEach(e => e.disabled = true);
            editButton.innerText = "Edit";
            const pinnedNote = element.parentElement.querySelector(".pinnedNote") as HTMLInputElement;
            const note: Note = {
                id: element.parentElement.id,
                title: inputs[0].value,
                content: inputs[1].value,
                bgColor: element.parentElement.style.backgroundColor,
                pinned: pinnedNote.checked
            };
            
           await this.updateNote(note.id, note);
        }
        
    }

    changeNoteValues(noteElement: HTMLDivElement, note: Note){
        noteElement.id = note.id;
        noteElement.style.backgroundColor = note.bgColor;

        const title = noteElement.querySelector(".noteTitle") as HTMLInputElement;
        title.value = note.title;
        
        const content = noteElement.querySelector(".noteContent") as HTMLInputElement;
        content.value = note.content;

        const pinned = noteElement.querySelector(".pinnedNote") as HTMLInputElement;
        pinned.checked = note.pinned;

        noteElement.removeChild(noteElement.querySelector(".buttonWrapper"));

        noteElement.querySelectorAll("input").forEach(element => {
            element.disabled = true;
        });
    }

    onPinClick(event: Event){
        const notesWrapper = document.querySelector("#notesWrapper") as HTMLDivElement;
        const pinnedWrapper = document.querySelector("#pinnedWrapper") as HTMLDivElement;
        const element = <HTMLElement>event.target;
        const noteDiv = element.parentElement;

        const pinned = noteDiv.querySelector(".pinnedNote") as HTMLInputElement;

    }
}