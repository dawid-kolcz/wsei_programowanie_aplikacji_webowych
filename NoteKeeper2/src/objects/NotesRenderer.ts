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

        const saveButton = this.createSaveButton();
        const deleteButton = this.createDeleteButton();
        const editButton = this.createEditButton();
        const pinInput = this.createPinInput();

        const saveButtonWrapper = document.createElement("div") as HTMLDivElement;
        saveButtonWrapper.className = "saveButtonWrapper";
        
        const buttonWrapper = document.createElement("div") as HTMLDivElement;
        buttonWrapper.className = "buttonWrapper";

        const aquamarineButton   = this.createColorButton("aquamarineBGButton", "aquamarine");
        const greenButton  = this.createColorButton("greenBGButton", "green");
        const yellowButton = this.createColorButton("yellowBGButton", "yellow");
        const whiteButton  = this.createColorButton("whiteBGButton", "white");
    
        this.onBGColorClick(aquamarineButton, newNote);
        this.onBGColorClick(greenButton, newNote);
        this.onBGColorClick(yellowButton, newNote);
        this.onBGColorClick(whiteButton, newNote);

        saveButtonWrapper.appendChild(aquamarineButton);
        saveButtonWrapper.appendChild(greenButton);
        saveButtonWrapper.appendChild(yellowButton);
        saveButtonWrapper.appendChild(whiteButton);
        saveButtonWrapper.appendChild(saveButton);

        buttonWrapper.appendChild(deleteButton);
        buttonWrapper.appendChild(editButton);
        buttonWrapper.appendChild(pinInput);

        newNote.appendChild(newTitle);
        newNote.appendChild(newContent);
        newNote.appendChild(saveButtonWrapper);
        newNote.appendChild(buttonWrapper);
        pinned ? document.querySelector("#pinnedWrapper").appendChild(newNote) :
            document.querySelector("#notesWrapper").appendChild(newNote)
        
        return newNote;
    }
    
    createSaveButton(): HTMLButtonElement{
        const button = document.createElement("button") as HTMLButtonElement;
        button.innerText = "Save note";
        button.className = "saveButton";
        button.addEventListener("click", (event) => this.onSaveClick(event));

        return button;
    }

    async onSaveClick(event: Event){
        const element = <HTMLElement>event.target;
        const noteDiv = element.parentElement.parentElement;
        const buttonWrapper = noteDiv.querySelector(".saveButtonWrapper") as HTMLDivElement;
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
        noteDiv.removeChild(buttonWrapper);
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
        const noteDiv = element.parentElement.parentElement;
        
        let id = noteDiv.id;
        let index = this.notesLogic.notesArray.findIndex(e => e.id == id);
        let note = this.notesLogic.notesArray[index];
        
        await this.notesLogic.deleteNote(note);
        noteDiv.parentElement.removeChild(noteDiv);
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
        const noteDiv = element.parentElement.parentElement as HTMLDivElement;
        const buttonWrapper = noteDiv.querySelector(".buttonWrapper");        
        const inputs = noteDiv.querySelectorAll("input");
        const editButton = noteDiv.querySelector(".editButton") as HTMLButtonElement;

        if(inputs[0].disabled = true && inputs[1].disabled == true){
            inputs.forEach(e => e.disabled = false);
            editButton.innerText = "Save";
        }else{
            inputs.forEach(e => e.disabled = true);
            editButton.innerText = "Edit";
            const pinnedNote = buttonWrapper.querySelector(".pinnedNote") as HTMLInputElement;
            const note: Note = {
                id: noteDiv.id,
                title: inputs[0].value,
                content: inputs[1].value,
                bgColor: noteDiv.style.backgroundColor,
                pinned: pinnedNote.checked
            };
            note.pinned ? this.switchPinned(noteDiv, true) : this.switchPinned(noteDiv, false);

            await this.notesLogic.updateNote(note.id, note);
        }
        
    }

    createPinInput(): HTMLInputElement{
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "checkbox";
        input.className = "pinnedNote";
        // input.addEventListener("click", (event) => this.onPinClick(event));

        return input; 
    }

    switchPinned(div: HTMLDivElement, pin: boolean){
        const notesWrapper = document.querySelector("#notesWrapper");
        const pinedWrapper = document.querySelector("#pinnedWrapper");
        if(pin){
            pinedWrapper.appendChild(div);
            // notesWrapper.removeChild(div);
        }else{
            notesWrapper.appendChild(div);
            // pinedWrapper.removeChild(div);
        }
    }
}