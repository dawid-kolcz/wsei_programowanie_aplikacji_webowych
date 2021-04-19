export class WheatherAPI {
    opwApiKey = '50d53005c0fd5f556bb4ef15224c4209';

    constructor() {
    }

    async getCityInfo(city: string) {
        const data = await this.getWeather(city);
        const name = data.name;
        const temp = data.main.temp;
        const weather = data.weather[0].description;
        return {
            'name': name,
            'temp': temp,
            'weather': weather,
        };
    }

    async getWeather(city: string) {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}&units=metric`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        return weatherData;
    }

    saveData(city: string) {
        let data =  localStorage.getItem('weatherData');
        if(data === null){
            data = city;            
        }else{
            data =+ ',' + city;
        }
        localStorage.setItem('weatherData', data);
    }

    getData(): Array<string> {
        const data = localStorage.getItem('weatherData');
        if (data) {
            return data.split(',');
        } else {
            return null;
        }
    }
}