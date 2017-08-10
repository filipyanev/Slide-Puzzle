/// <reference path="../../Lib/phaser.d.ts"/>
///<reference path="../../app-chef-game-container/AppChefUI.ts"/>

module SlidingGame {
    export class Game extends Phaser.State {
        appChefUI: AppChefContainer.AppChefUI;

        create() {

            let slide = this.game.add.audio('slide');
            let list: string[][];
            let wrightList: string[][];
            let myPosX;
            let myPosY;
            let rowIndex;
            let columnIndex;
            let movesCounter:number = 0;
            let bestSc:number;
            let noneRowIndex = 4;
            let noneColIndex = 4;
            let myBlockWidth = innerWidth * 0.25;

            if (parseInt(localStorage.getItem('bestSc')) != null) {
                bestSc = parseInt(localStorage.getItem('bestSc'));
            }else {
                localStorage.setItem('bestSc', JSON.stringify(0));
                bestSc = 0;
            }
            this.game.stage.backgroundColor = "#ffffff";

            list = [["out", "out", "out", "out" , "out", "out" ],
                ["out","block1", "block2", "block3","block4", "out"],
                ["out","block5", "block6", "block7","block8", "out"],
                ["out","block9", "block10", "block11","block12", "out"],
                ["out","block13", "block14", "block15","none", "out"],
                ["out","out", "out", "out", "out", "out" ]];
            wrightList = [["out", "out", "out", "out" , "out", "out" ],
                ["out","block1", "block2", "block3","block4", "out"],
                ["out","block5", "block6", "block7","block8", "out"],
                ["out","block9", "block10", "block11","block12", "out"],
                ["out","block13", "block14", "block15","none", "out"],
                ["out","out", "out", "out", "out", "out" ]];

            /*  +++++++++++++++++++++++++++++++++++=  CREATE BLOCKS ++++++++++++++++++++++++++++++++++++++++++++++++= */

        let bl1 = this.game.add.sprite(this.game.world.centerX - 2 * myBlockWidth, this.game.world.centerY - 2 * myBlockWidth, 'block1');
        bl1.anchor.setTo(0, 0);
        bl1.width = myBlockWidth;
        bl1.height = myBlockWidth;
        bl1.alpha = 0.8;

        let bl2 = this.game.add.sprite(this.game.world.centerX - myBlockWidth, this.game.world.centerY - 2 * myBlockWidth, 'block2');
        bl2.anchor.setTo(0, 0);
        bl2.width = myBlockWidth;
        bl2.height = myBlockWidth;
        bl2.alpha = 0.8;

        let bl3 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 2 * myBlockWidth, 'block3');
        bl3.anchor.setTo(0, 0);
        bl3.width = myBlockWidth;
        bl3.height = myBlockWidth;
        bl3.alpha = 0.8;

        let bl4 = this.game.add.sprite(this.game.world.centerX + myBlockWidth, this.game.world.centerY - 2 * myBlockWidth, 'block4');
        bl4.anchor.setTo(0, 0);
        bl4.width = myBlockWidth;
        bl4.height = myBlockWidth;
        bl4.alpha = 0.8;

                    /* +++++++++++++++++++++++   SECOND ROW        ++++++++++++++++++++++++++++++++= */

        let bl5 = this.game.add.sprite(this.game.world.centerX - 2 * myBlockWidth, this.game.world.centerY - myBlockWidth, 'block5');
        bl5.anchor.setTo(0, 0);
        bl5.width = myBlockWidth;
        bl5.height = myBlockWidth;
        bl5.alpha = 0.8;

        let bl6 = this.game.add.sprite(this.game.world.centerX - myBlockWidth, this.game.world.centerY - myBlockWidth, 'block6');
        bl6.anchor.setTo(0, 0);
        bl6.width = myBlockWidth;
        bl6.height = myBlockWidth;
        bl6.alpha = 0.8;

        let bl7 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - myBlockWidth, 'block7');
        bl7.anchor.setTo(0, 0);
        bl7.width = myBlockWidth;
        bl7.height = myBlockWidth;
        bl7.alpha = 0.8;

        let bl8 = this.game.add.sprite(this.game.world.centerX + myBlockWidth, this.game.world.centerY - myBlockWidth, 'block8');
        bl8.anchor.setTo(0, 0);
        bl8.width = myBlockWidth;
        bl8.height = myBlockWidth;
        bl8.alpha = 0.8;

                 /*  ++++++++++++++++++++++++++++== THIRD ROW ++++++++++++++++++= */

        let bl9 = this.game.add.sprite(this.game.world.centerX - 2 * myBlockWidth, this.game.world.centerY, 'block9');
        bl9.anchor.setTo(0, 0);
        bl9.width = myBlockWidth;
        bl9.height = myBlockWidth;
        bl9.alpha = 0.8;

        let bl10 = this.game.add.sprite(this.game.world.centerX - myBlockWidth, this.game.world.centerY, 'block10');
        bl10.anchor.setTo(0, 0);
        bl10.width = myBlockWidth;
        bl10.height = myBlockWidth;
        bl10.alpha = 0.8;

        let bl11 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'block11');
        bl11.anchor.setTo(0, 0);
        bl11.width = myBlockWidth;
        bl11.height = myBlockWidth;
        bl11.alpha = 0.8;

        let bl12 = this.game.add.sprite(this.game.world.centerX + myBlockWidth, this.game.world.centerY, 'block12');
        bl12.anchor.setTo(0, 0);
        bl12.width = myBlockWidth;
        bl12.height = myBlockWidth;
        bl12.alpha = 0.8;

                         /* +++++++++++++++++++++== FOURTH ROW +++++++++++++++= */

        let bl13 = this.game.add.sprite(this.game.world.centerX - 2* myBlockWidth, this.game.world.centerY + myBlockWidth, 'block13');
        bl13.anchor.setTo(0, 0);
        bl13.width = myBlockWidth;
        bl13.height = myBlockWidth;
        bl13.alpha = 0.8;

        let bl14 = this.game.add.sprite(this.game.world.centerX - myBlockWidth, this.game.world.centerY + myBlockWidth, 'block14');
        bl14.anchor.setTo(0, 0);
        bl14.width = myBlockWidth;
        bl14.height = myBlockWidth;
        bl14.alpha = 0.8;

        let bl15 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + myBlockWidth, 'block15');
        bl15.anchor.setTo(0, 0);
        bl15.width = myBlockWidth;
        bl15.height = myBlockWidth;
        bl15.alpha = 0.8;

            bl1.inputEnabled = true;
            bl2.inputEnabled = true;
            bl3.inputEnabled = true;
            bl4.inputEnabled = true;
            bl5.inputEnabled = true;
            bl6.inputEnabled = true;
            bl7.inputEnabled = true;
            bl8.inputEnabled = true;
            bl9.inputEnabled = true;
            bl10.inputEnabled = true;
            bl11.inputEnabled = true;
            bl12.inputEnabled = true;
            bl13.inputEnabled = true;
            bl14.inputEnabled = true;
            bl15.inputEnabled = true;

            bl1.events.onInputDown.add(moveOnClick, this);
            bl2.events.onInputDown.add(moveOnClick, this);
            bl3.events.onInputDown.add(moveOnClick, this);
            bl4.events.onInputDown.add(moveOnClick, this);
            bl5.events.onInputDown.add(moveOnClick, this);
            bl6.events.onInputDown.add(moveOnClick, this);
            bl7.events.onInputDown.add(moveOnClick, this);
            bl8.events.onInputDown.add(moveOnClick, this);
            bl9.events.onInputDown.add(moveOnClick, this);
            bl10.events.onInputDown.add(moveOnClick, this);
            bl11.events.onInputDown.add(moveOnClick, this);
            bl12.events.onInputDown.add(moveOnClick, this);
            bl13.events.onInputDown.add(moveOnClick, this);
            bl14.events.onInputDown.add(moveOnClick, this);
            bl15.events.onInputDown.add(moveOnClick, this);

            function moveOnClick(tile) {
                console.log("inside listener");
                moveP(tile);
            }
            function moveP(tile) {
                myPosX = tile.position.x;
                myPosY = tile.position.y;

                /*  get index of element from list */
                for (let i = 1; i < 5; i++) {
                    for (var g = 1; g < 5; g++) {
                        if (list[i][g] == tile.key) {
                            rowIndex = i;
                            columnIndex = g;
                            break;
                        }
                    }
                }
                checkPossMove(tile);
                console.log(checkForWin());
            }
            function checkPossMove(tile) {

                if(list[rowIndex - 1][columnIndex] === "none"){
                    tile.position.set(myPosX,myPosY - myBlockWidth);
                    list[rowIndex - 1][columnIndex] =  tile.key;
                    list[rowIndex][columnIndex] = "none";
                    movesCounter++;
                    checkBest(movesCounter);
                    slide.play();
                }
                if(list[rowIndex + 1][columnIndex] === "none"){
                    tile.position.set(myPosX,myPosY + myBlockWidth);
                    list[rowIndex + 1][columnIndex] =  tile.key;
                    list[rowIndex][columnIndex] = "none";
                    movesCounter++;
                    checkBest(movesCounter);
                    slide.play();
                }
                if(list[rowIndex][columnIndex-1] === "none"){
                    tile.position.set(myPosX - myBlockWidth,myPosY);
                    list[rowIndex][columnIndex - 1] =  tile.key;
                    list[rowIndex][columnIndex] = "none";
                    movesCounter++;
                    checkBest(movesCounter);
                    slide.play();
                }
                if(list[rowIndex][columnIndex+1] === "none") {
                    tile.position.set(myPosX + myBlockWidth,myPosY);
                    list[rowIndex][columnIndex + 1] =  tile.key;
                    list[rowIndex][columnIndex] = "none";
                    movesCounter++;
                    checkBest(movesCounter);
                    slide.play();
                }
            }
            function checkBest(x){
                if(checkForWin()) {
                    if (x < bestSc) {
                        bestSc = x;
                        localStorage.setItem('bestSc', JSON.stringify(bestSc));
                        console.log(localStorage.getItem('bestSc'));
                    }
                }

            }
            function checkForWin():boolean{
                if(JSON.stringify(wrightList) === JSON.stringify(list)){
                    return true;
                }
                else {
                    return false;
                }
            }


            randomBoard();

            /*       TRY TO DO SOME DECENT RANDOM GENERATOR        */

            function randomBoard(){
                for(let i = 1; i < 100; i++){
                    randomChangePosition();
                }
            }
            function randomChangePosition(){
                let indList :number[] = [1,2,3,4];
                let randShit = Math.floor(Math.random()*indList.length)
                let fInd = indList[randShit];
                checkPossMoveRG(fInd,noneRowIndex,noneColIndex);
            }

            /*         CHECK POSSIBLE MOVES FOR RANDOM GENERATOR     */

            function checkPossMoveRG(elNum, row, col) {
                    let blockforMove;

                if((list[row - 1][col] != "out") && elNum === 1){
                    switch(list[row - 1][col]){
                        case "block1" : blockforMove = bl1;break;
                        case "block2" : blockforMove =  bl2;break;
                        case "block3" : blockforMove =  bl3;break;
                        case "block4" : blockforMove =  bl4;break;
                        case "block6" : blockforMove =  bl6;break;
                        case "block7" : blockforMove =  bl7;break;
                        case "block8" : blockforMove =  bl8;break;
                        case "block9" : blockforMove =  bl9;break;
                        case "block10" : blockforMove =  bl10;break;
                        case "block11" : blockforMove =  bl11;break;
                        case "block12" : blockforMove =  bl12;break;
                        case "block13" : blockforMove =  bl13;break;
                        case "block14" : blockforMove =  bl14;break;
                        case "block15" : blockforMove =  bl15;break;
                    }
                    if(blockforMove != undefined) {
                        blockforMove.position.set(blockforMove.position.x, blockforMove.position.y + myBlockWidth);
                        list[row - 1][col] = "none";
                        noneRowIndex = noneRowIndex - 1;
                        list[row][col] = blockforMove.key;
                    }
                }

                if((list[row + 1][col] != "out")&& elNum === 2){
                    switch(list[row + 1][col]){
                        case "block1" : blockforMove = bl1;break;
                        case "block2" : blockforMove =  bl2;break;
                        case "block3" : blockforMove =  bl3;break;
                        case "block4" : blockforMove =  bl4;break;
                        case "block6" : blockforMove =  bl6;break;
                        case "block7" : blockforMove =  bl7;break;
                        case "block8" : blockforMove =  bl8;break;
                        case "block9" : blockforMove =  bl9;break;
                        case "block10" : blockforMove =  bl10;break;
                        case "block11" : blockforMove =  bl11;break;
                        case "block12" : blockforMove =  bl12;break;
                        case "block13" : blockforMove =  bl13;break;
                        case "block14" : blockforMove =  bl14;break;
                        case "block15" : blockforMove =  bl15;break;
                    }
                    if(blockforMove != undefined) {
                        blockforMove.position.set(blockforMove.position.x, blockforMove.position.y - myBlockWidth);
                        list[row + 1][col] = "none";
                        noneRowIndex = noneRowIndex + 1;
                        list[row][col] = blockforMove.key;
                    }

                }
                if((list[row][col-1] != "out")&& elNum === 3){
                    switch(list[row][col-1]){
                        case "block1" : blockforMove = bl1;break;
                        case "block2" : blockforMove =  bl2;break;
                        case "block3" : blockforMove =  bl3;break;
                        case "block4" : blockforMove =  bl4;break;
                        case "block6" : blockforMove =  bl6;break;
                        case "block7" : blockforMove =  bl7;break;
                        case "block8" : blockforMove =  bl8;break;
                        case "block9" : blockforMove =  bl9;break;
                        case "block10" : blockforMove =  bl10;break;
                        case "block11" : blockforMove =  bl11;break;
                        case "block12" : blockforMove =  bl12;break;
                        case "block13" : blockforMove =  bl13;break;
                        case "block14" : blockforMove =  bl14;break;
                        case "block15" : blockforMove =  bl15;break;
                    }
                    if(blockforMove != undefined) {
                        blockforMove.position.set(blockforMove.position.x + myBlockWidth, blockforMove.position.y);
                        list[row][col - 1] = "none";
                        noneColIndex = noneColIndex - 1;
                        list[row][col] = blockforMove.key;
                    }

                }
                if((list[row][col+1] != "out")&& elNum === 4) {
                    switch(list[row][col + 1]){
                        case "block1" : blockforMove = bl1;break;
                        case "block2" : blockforMove =  bl2;break;
                        case "block3" : blockforMove =  bl3;break;
                        case "block4" : blockforMove =  bl4;break;
                        case "block6" : blockforMove =  bl6;break;
                        case "block7" : blockforMove =  bl7;break;
                        case "block8" : blockforMove =  bl8;break;
                        case "block9" : blockforMove =  bl9;break;
                        case "block10" : blockforMove =  bl10;break;
                        case "block11" : blockforMove =  bl11;break;
                        case "block12" : blockforMove =  bl12;break;
                        case "block13" : blockforMove =  bl13;break;
                        case "block14" : blockforMove =  bl14;break;
                        case "block15" : blockforMove =  bl15;break;
                    }
                    if(blockforMove != undefined) {
                        blockforMove.position.set(blockforMove.position.x - myBlockWidth, blockforMove.position.y);
                        list[row][col + 1] = "none";
                        noneColIndex = noneColIndex + 1;
                        list[row][col] = blockforMove.key;
                    }
                }

            }

        }

        update(){

        }
    }
}