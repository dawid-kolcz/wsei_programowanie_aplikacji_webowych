class App{
	startingTable = 4;
	inputArray: Array<HTMLInputElement>;

	input1: HTMLInputElement;
	input2: HTMLInputElement;
	input3: HTMLInputElement;
	input4: HTMLInputElement;

	output1: HTMLInputElement;
        output2: HTMLInputElement;
        output3: HTMLInputElement;
        output4: HTMLInputElement;

	a: decimal;
	
	constructor(){
		this.createTable(startingTable);
		this.getRef();
		this.watchData();
	}
	
	createTable(cellCount: decimal): void{
		for(let i = 0 i < cellCount; i++){
			
		}	
	}

	getRef(): void{	
		this.input1 = document.querySelector("#input1");
		
		this.output1 = document.querySelector("#output1");
	}

	getData(): void{
		this.a = +this.input1.value;
	}

	processData(): void{
		this.getData();
		this.output1.value = this.a.toString();
	}

	watchData(): void{
		this.input1.addEventListener('input', () => this.processData());
	}
}	

const app = new App();
