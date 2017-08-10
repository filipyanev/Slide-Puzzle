/// <reference path="../../lib/phaser.d.ts"/>
///<reference path="Game.ts"/>


module SlidingGame {

    export class Preloader extends Phaser.State {
        preload() {

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
            this.game.load.audio('slide','Assets/176146__swagmuffinplus__sliding-doors.wav');
        }

        create() {
            this.game.state.start("Game");
        }
    }
}