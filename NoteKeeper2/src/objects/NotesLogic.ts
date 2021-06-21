import { globalStorage, StorageType } from "../config";
import { Note } from "./Note";
import { NotesRenderer } from "./NotesRenderer";
import * as FB from "./FB";

export class NotesLogic{
    notesArray: Array<Note> = [];
    noteRenderer = new NotesRenderer(this);

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
            const newNote = this.noteRenderer.newNote(element.pinned);
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
    changeNoteValues(noteElement: HTMLDivElement, note: Note){
        noteElement.id = note.id;
        noteElement.style.backgroundColor = note.bgColor;

        const title = noteElement.querySelector(".noteTitle") as HTMLInputElement;
        title.value = note.title;
        
        const content = noteElement.querySelector(".noteContent") as HTMLInputElement;
        content.value = note.content;

        const pinned = noteElement.querySelector(".pinnedNote") as HTMLInputElement;
        pinned.checked = note.pinned;

        noteElement.removeChild(noteElement.querySelector(".saveButtonWrapper"));

        noteElement.querySelectorAll("input").forEach(element => {
            element.disabled = true;
        });
    }
}