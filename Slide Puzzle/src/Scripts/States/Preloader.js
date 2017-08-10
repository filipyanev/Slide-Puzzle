/// <reference path="../../lib/phaser.d.ts"/>
///<reference path="Game.ts"/>
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
var SlidingGame;
(function (SlidingGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            this.game.load.image('block1', 'Assets/block1.jpg');
            this.game.load.image('block2', 'Assets/block2.jpg');
            this.game.load.image('block3', 'Assets/block3.jpg');
            this.game.load.image('block4', 'Assets/block4.jpg');
            this.game.load.image('block6', 'Assets/block6.jpg');
            this.game.load.image('block7', 'Assets/block7.jpg');
            this.game.load.image('block8', 'Assets/block8.jpg');
            this.game.load.image('block9', 'Assets/block9.jpg');
            this.game.load.image('block10', 'Assets/block10.jpg');
            this.game.load.image('block11', 'Assets/block11.jpg');
            this.game.load.image('block12', 'Assets/block12.jpg');
            this.game.load.image('block13', 'Assets/block13.jpg');
            this.game.load.image('block14', 'Assets/block14.jpg');
            this.game.load.image('block15', 'Assets/block15.jpg');
            this.game.load.image('block5', 'Assets/block5.jpg');
            // this.game.load.image('playBtn', 'Assets/playB.png');
            this.game.load.audio('slide', 'Assets/176146__swagmuffinplus__sliding-doors.wav');
        };
        Preloader.prototype.create = function () {
            this.game.state.start("Game");
        };
        return Preloader;
    }(Phaser.State));
    SlidingGame.Preloader = Preloader;
})(SlidingGame || (SlidingGame = {}));
