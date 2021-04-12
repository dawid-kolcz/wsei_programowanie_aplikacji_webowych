import { WheatherAPI } from "./WheaterAPI";

export class RenderWheather{
    api: WheatherAPI;

    constructor(wheather: WheatherAPI){
        this.api = wheather;
    }
}