import { WheatherAPI } from './WheaterAPI';
import { RenderWeather } from './RenderWeather';

const wheatherApi = new WheatherAPI();
const renderWheather = new RenderWeather(wheatherApi);