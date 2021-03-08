var App = /** @class */ (function () {
    function App() {
        this.startingInputs = 4;
        this.inputArray = [];
        this.outputArray = [];
        this.resultArray = [];
        this.main();
    }
    App.prototype.main = function () {
        this.inputDiv = document.querySelector(".input-data");
        this.outputDiv = document.querySelector(".output-data");
        this.createDefaultInputs(this.startingInputs);
        this.createAddMoreButton();
        this.createOutputs();
    };
    App.prototype.createDefaultInputs = function (cellCount) {
        for (var i = 0; i < cellCount; i++) {
            this.createInput();
        }
    };
    App.prototype.createInput = function () {
        var _this = this;
        var newInput = document.createElement("input");
        newInput.type = "number";
        newInput.addEventListener("change", function () { return _this.displayData(); });
        this.inputArray.push(newInput);
        this.inputDiv.appendChild(newInput);
    };
    App.prototype.createAddMoreButton = function () {
        var _this = this;
        var addInputDiv = document.querySelector(".add-input-data");
        var button = document.createElement("input");
        button.value = "Add more inputs";
        button.type = "button";
        button.addEventListener("click", function () { return _this.createInput(); });
        addInputDiv.appendChild(button);
    };
    App.prototype.createOutputs = function () {
        for (var i = 0; i < 4; i++) {
            var newOutput = document.createElement("input");
            newOutput.type = "text";
            newOutput.disabled = true;
            this.outputArray.push(newOutput);
            this.outputDiv.appendChild(newOutput);
        }
    };
    App.prototype.getValues = function () {
        var arr = [];
        for (var _i = 0, _a = this.inputArray; _i < _a.length; _i++) {
            var i = _a[_i];
            arr.push(+i.value);
        }
        return arr;
    };
    App.prototype.processData = function () {
        //sum, avg, min, max
        var arr = this.getValues();
        var sum = 0;
        var avg = 0;
        var min = 0;
        var max = 0;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            sum += i;
        }
        avg = sum / arr.length;
        min = Math.min.apply(Math, arr);
        max = Math.max.apply(Math, arr);
        this.resultArray[0] = sum;
        this.resultArray[1] = avg;
        this.resultArray[2] = min;
        this.resultArray[3] = max;
    };
    App.prototype.displayData = function () {
        this.processData();
        for (var i = 0; i < 4; i++) {
            this.outputArray[i].value = this.resultArray[i].toString();
        }
    };
    return App;
}());
var app = new App();
