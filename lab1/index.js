var App = /** @class */ (function () {
    function App() {
        this.getRef();
        this.watchData();
    }
    App.prototype.getRef = function () {
        this.input1 = document.querySelector("#input1");
        this.output1 = document.querySelector("#output1");
    };
    App.prototype.getData = function () {
        this.a = +this.input1.value;
    };
    App.prototype.processData = function () {
        this.getData();
        this.output1.value = this.a.toString();
    };
    App.prototype.watchData = function () {
        var _this = this;
        this.input1.addEventListener('input', function () { return _this.processData(); });
    };
    return App;
}());
var app = new App();
