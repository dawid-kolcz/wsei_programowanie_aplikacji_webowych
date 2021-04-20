import { WheatherAPI } from "./WheaterAPI";

export class RenderWeather{
    api: WheatherAPI;
    cityName: HTMLInputElement;
    wrapper: HTMLDivElement;

    constructor(wheather: WheatherAPI){
        this.api = wheather;
        this.cityName = document.querySelector(".CityInput #city") as HTMLInputElement;
        this.wrapper = document.querySelector("#wrapper") as HTMLDivElement;
        document.querySelector(".CityInput #button").addEventListener("click", () => this.searchCity());
        this.getDataFromStorage();
    }
    getDataFromStorage() {
        const data = localStorage.getItem('weatherData')
        let arr = data.split(',');
        if(arr[0] != ''){
            arr.forEach((element) =>{
                this.renderWheather(element);
            });
        }
    }
    async renderWheather(city: string) {
        const data = await this.api.getCityInfo(city);
        this.createWeatherBox(data);
    }

    searchCity(): void{
        const city = this.cityName.value;
        
        this.api.saveData(city);
        this.renderWheather(city);
        this.cityName.value = '';
    }
    createWeatherBox(data: any): void{
        const box = document.createElement('div');
        const name = document.createElement('span');
        const weather = document.createElement('span');
        const temperature = document.createElement('span');

        box.id = 'weatherBox';
        name.id = 'cityName';
        weather.id = 'cityWeather';
        temperature.id = 'cityTemperature';

        name.innerText = 'Miasto: ' + data.name;
        weather.innerText = 'Pogoda: ' + data.weather;
        temperature.innerText = data.temp + 'C';

        box.appendChild(name);
        box.appendChild(weather);
        box.appendChild(temperature);

        this.wrapper.appendChild(box);
    }

}