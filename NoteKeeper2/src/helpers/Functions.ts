import { Note } from "../objects/Notes";

export * as Functions from "../helpers/Functions"

export function saveNote(note: Note){
    const notesWrapper = document.querySelector("#notesWrapper") as HTMLDivElement;
    const pinnedWrapper = document.querySelector("#pinnedWrapper") as HTMLDivElement;

}

export function newNote(): void{
    const mainWrapper = document.querySelector("#mainWrapper") as HTMLDivElement;
    const newNote = document.createElement("div") as HTMLDivElement;

    newNote.className = "newNote";

    const newTitle = document.createElement("input") as HTMLInputElement; 
    const newContent = document.createElement("input") as HTMLInputElement;

    newNote.appendChild(newTitle);
    newNote.appendChild(newContent);

    mainWrapper.appendChild(newNote);
}