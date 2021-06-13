import './main.scss';
import  * as FB from "./objects/FB";
import { Note, Notes } from "./objects/Notes";

function main(): void{
    const notes = new Notes();

    const addButton = document.querySelector("#addNoteButton") as HTMLButtonElement;
    addButton.addEventListener("click", () => { 
        notes.newNote();
        console.log("Create new note");
    });
}

main();