import { Note } from "./Note";
import { NotesLogic } from "./NotesLogic";

export class NotesRenderer{
    notesLogic: NotesLogic;

    constructor(logic: NotesLogic){
        this.notesLogic = logic;
    }

    newNote(pinned: boolean): HTMLDivElement{
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
        pinned ? document.querySelector("#pinnedWrapper").appendChild(newNote) :
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
        this.notesLogic.notesArray.push(note)
        await this.notesLogic.saveNote(note);
        
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
        let index = this.notesLogic.notesArray.findIndex(e => e.id == id);
        let note = this.notesLogic.notesArray[index];
        await this.notesLogic.deleteNote(note);
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
            
           await this.notesLogic.updateNote(note.id, note);
        }
        
    }

    async onPinClick(event: Event){
        const notesWrapper = document.querySelector("#notesWrapper") as HTMLDivElement;
        const pinnedWrapper = document.querySelector("#pinnedWrapper") as HTMLDivElement;
        const element = <HTMLElement>event.target;
        const noteDiv = element.parentElement;

        const pinned = noteDiv.querySelector(".pinnedNote") as HTMLInputElement;

        const id = noteDiv.id;

        const index = this.notesLogic.notesArray.findIndex(e => e.id == id);
        const note = this.notesLogic.notesArray[index];

        if(note.pinned){
            note.pinned = false;
            pinnedWrapper.removeChild(noteDiv);
            notesWrapper.appendChild(noteDiv);
        }else{
            note.pinned = true;
            pinnedWrapper.appendChild(noteDiv);
            notesWrapper.removeChild(noteDiv);
        }
        
        this.notesLogic.notesArray[index] = note;
        await this.notesLogic.updateNote(id, note);
    }
}