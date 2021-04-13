import { WheatherAPI } from "./WheaterAPI";

export class RenderWheather{
    api: WheatherAPI;
    cityName: HTMLInputElement;

    constructor(wheather: WheatherAPI){
        this.api = wheather;
        this.cityName = document.querySelector(".CityInput #city") as HTMLInputElement;
        document.querySelector(".CityInput #button").addEventListener("click", () => this.queryWheather());
    }

    getData(data: Promise<any>): Array<string>{
        let dataArray: Array<string> = [];



        return dataArray;
    }

    renderWheather(data: Array<string>): void{

    }

    queryWheather(): void{
        let rawData: Promise<any> = this.api.getWeather(this.cityName.value);
        let data: Array<string> = this.getData(rawData);
        this.renderWheather(data)
    }
}