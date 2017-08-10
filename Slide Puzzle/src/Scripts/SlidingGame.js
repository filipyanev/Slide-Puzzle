/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="States/Preloader.ts"/>
///<reference path="States/Game.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function RNG(from, to) {
    return Math.random() * (to - from) + from;
}
var SlidingGame;
(function (SlidingGame_1) {
    SlidingGame_1.GAME_WIDTH = 800;
    SlidingGame_1.GAME_HEIGHT = 1280;
    var SlidingGame = (function (_super) {
        __extends(SlidingGame, _super);
        function SlidingGame() {
            var _this = this;
            var dpr = devicePixelRatio || 1;
            var width = window.innerWidth * ((dpr / 2));
            var height = window.innerHeight * ((dpr / 2));
            if (Phaser.Device.isAndroidStockBrowser() && devicePixelRatio === 2) {
                width = window.innerWidth * ((dpr / 2) - 0.1);
                height = window.innerHeight * ((dpr / 2) - 0.1);
            }
            else if (Phaser.Device.isAndroidStockBrowser() && devicePixelRatio === 3) {
                width = window.innerWidth * ((dpr / 2) + 0.3);
                height = window.innerHeight * ((dpr / 2) + 0.3);
            }
            else if (devicePixelRatio <= 2 && /Android/i.test(navigator.userAgent)) {
                width = window.innerWidth * ((dpr / 2) + 0.3);
                height = window.innerHeight * ((dpr / 2) + 0.3);
            }
            else if (devicePixelRatio <= 3 && /Android/i.test(navigator.userAgent)) {
                width = window.innerWidth * ((dpr / 2) + 0.4);
                height = window.innerHeight * ((dpr / 2) + 0.4);
            }
            else {
                width = window.innerWidth * ((dpr / 2) + 0.5);
                height = window.innerHeight * ((dpr / 2) + 0.5);
            }
            if (height > SlidingGame_1.GAME_HEIGHT) {
                height = SlidingGame_1.GAME_HEIGHT;
                width = SlidingGame_1.GAME_HEIGHT / (window.innerHeight / window.innerWidth);
            }
            _this = _super.call(this, width, height, Phaser.AUTO, 'phaser-div', true, true) || this;
            _this.init();
            return _this;
        }
        SlidingGame.prototype.init = function () {
            this.state.add("Preloader", SlidingGame_1.Preloader, false);
            this.state.add("Game", SlidingGame_1.Game, false);
            this.state.start("Preloader");
        };
        return SlidingGame;
    }(Phaser.Game));
    var alreadyCreated;
    var createGame = function () {
        if (!window.innerWidth) {
            setTimeout(runTheShit, 100);
            return;
        }
        if (!alreadyCreated) {
            alreadyCreated = true;
            setTimeout(function () {
                if (window.innerWidth > window.innerHeight) {
                    setTimeout(createGame, 100);
                    alreadyCreated = false;
                    return;
                }
                new SlidingGame();
            }, 1000);
        }
    };
    function runTheShit() {
        if (!window.innerWidth) {
            setTimeout(runTheShit, 100);
            return;
        }
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini  /i.test(navigator.userAgent)) {
            if (window.innerHeight > window.innerWidth) {
                createGame();
            }
        }
        else {
            if (window.innerWidth > SlidingGame_1.GAME_WIDTH) {
                window.innerWidth = (SlidingGame_1.GAME_WIDTH / SlidingGame_1.GAME_HEIGHT) * window.innerHeight;
            }
            createGame();
        }
    }
    window.onload = runTheShit;
    window.onresize = function () {
        if (!Phaser.GAMES[0]) {
            if (window.innerHeight > window.innerWidth) {
                createGame();
            }
        }
        else {
            if (window.innerWidth > window.innerHeight) {
                Phaser.GAMES[0].paused = true;
            }
            else if (window.innerWidth < window.innerHeight) {
                Phaser.GAMES[0].paused = false;
            }
        }
    };
})(SlidingGame || (SlidingGame = {}));
