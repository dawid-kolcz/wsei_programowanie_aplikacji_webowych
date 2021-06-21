import './main.scss';
import { Note, Notes } from "./objects/Notes";

function main(): void{
    const notes = new Notes();
    
    notes.getNotes();

    const addButton = document.querySelector("#addNoteButton") as HTMLButtonElement;
    addButton.addEventListener("click", () => { 
        notes.newNote();
    });
}

main();