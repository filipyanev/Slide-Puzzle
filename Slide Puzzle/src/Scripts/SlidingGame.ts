/// <reference path="../Lib/phaser.d.ts"/>
///<reference path="States/Preloader.ts"/>
///<reference path="States/Game.ts"/>


function RNG(from: number, to: number): number {
    return Math.random() * (to - from) + from;
}

module SlidingGame {
    export const GAME_WIDTH: number = 800;
    export const GAME_HEIGHT: number = 1280;


    class SlidingGame extends Phaser.Game {
        game: Phaser.Game;

        constructor() {
            let dpr = devicePixelRatio || 1;

            let width = window.innerWidth * ((dpr / 2));
            let height = window.innerHeight * ((dpr / 2));

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

            if (height > GAME_HEIGHT) {
                height = GAME_HEIGHT;
                width = GAME_HEIGHT / (window.innerHeight / window.innerWidth);
            }

            super(width, height, Phaser.AUTO, 'phaser-div', true, true);
            this.init();
        }

        init() {
            this.state.add("Preloader", Preloader, false);
            this.state.add("Game", Game, false);

            this.state.start("Preloader");
        }
    }

    let alreadyCreated: boolean;

    let createGame = function () {
        if (!window.innerWidth) {
            setTimeout(runTheShit, 100);
            return;
        }

        if (!alreadyCreated) {
            alreadyCreated = true;
            setTimeout(() => {
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
            if (window.innerWidth > GAME_WIDTH) {
                window.innerWidth = (GAME_WIDTH / GAME_HEIGHT) * window.innerHeight;
            }

            createGame();
        }
    }

    window.onload = runTheShit;

    window.onresize = () => {
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
    }
}