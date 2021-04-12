import { WheatherAPI } from './WheaterAPI';
import { RenderWheather } from './RenderWheather';

const wheatherApi = new WheatherAPI();
const renderWheather = new RenderWheather(wheatherApi);