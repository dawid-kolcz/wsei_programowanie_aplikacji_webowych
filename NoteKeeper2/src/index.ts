import './main.scss';
import  * as FB from "./objects/FB";
import { Functions } from "./helpers/Functions"
import { Note } from "./objects/Notes";

function main(): void{
    const addButton = document.querySelector("#addNoteButton") as HTMLButtonElement;
    addButton.addEventListener("click", () => { 
        
        console.log("Create new note");
    });
}

main();