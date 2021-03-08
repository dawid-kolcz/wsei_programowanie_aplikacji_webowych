class App{
	startingInputs: number = 4;
	inputDiv: HTMLElement;
	outputDiv: HTMLElement;

	inputArray: Array<HTMLInputElement> = [];
	outputArray: Array<HTMLInputElement> = [];
	
	resultArray: Array<number> = [];

	constructor(){
		this.main();
	}

	main(): void{
		this.inputDiv = document.querySelector(".input-data");
		this.outputDiv = document.querySelector(".output-data");
		this.createDefaultInputs(this.startingInputs);
		this.createAddMoreButton();
		this.createOutputs();
	}
	
	createDefaultInputs(cellCount: number): void{
		for(let i = 0; i < cellCount; i++){
			this.createInput();
		}
	}
	
	createInput(): void{
		const newInput = document.createElement("input")! as HTMLInputElement;
		newInput.type = "number";
		newInput.addEventListener("change", () => this.displayData());
		this.inputArray.push(newInput);
		this.inputDiv.appendChild(newInput);
	}

	createAddMoreButton(): void{
		const addInputDiv = document.querySelector(".add-input-data")! as HTMLElement;
		const button = document.createElement("input")! as HTMLButtonElement;
		button.value = "Add more inputs";
		button.type = "button";
		button.addEventListener("click", () => this.createInput());
		addInputDiv.appendChild(button);
	}

	createOutputs(): void{
		for(let i = 0; i < 4; i++){
			const newOutput = document.createElement("input")! as HTMLInputElement;
			newOutput.type = "text";
			newOutput.disabled = true;
			this.outputArray.push(newOutput);
			this.outputDiv.appendChild(newOutput);
		}
	}
	
	getValues(): Array<number>{
		let arr: Array<number> = [];
		for(let i of this.inputArray){
			arr.push(+i.value);
		}
		return arr;
	}

	processData(): void{
		//sum, avg, min, max
		const arr: Array<number> = this.getValues();

		let sum = 0;
		let avg = 0;
		let min = 0;
		let max = 0;

		for(let i of arr){
			sum += i;
		}
		
		avg = sum/arr.length;
		min = Math.min(...arr);
		max = Math.max(...arr);
		
		this.resultArray[0] = sum;
		this.resultArray[1] = avg;
		this.resultArray[2] = min;
		this.resultArray[3] = max;
	}
	
	displayData(): void{
		this.processData();

		for(let i = 0; i < 4; i++){
			this.outputArray[i].value = this.resultArray[i].toString();
		}
	}
}	

const app = new App();
