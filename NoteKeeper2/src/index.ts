import './main.scss';
import { NotesLogic } from './objects/NotesLogic';

function main(): void{
    const notes = new NotesLogic();
    
    notes.getNotes();
    console.log(notes.notesArray);

    const addButton = document.querySelector("#addNoteButton") as HTMLButtonElement;
    addButton.addEventListener("click", () => { 
        notes.noteRenderer.newNote(false);
    });
}

main();