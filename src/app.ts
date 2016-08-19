import Tile from './tile';


class SimpleGame {

    game: Phaser.Game;
    tileSet: any[];
    tileSetUpdate: any[];
    tileWidth: number;
    tileHeight: number;
    tilesNumber:number;
    cursors: Phaser.CursorKeys;
    canMove: boolean = false;
    moved:boolean = false;
    relaunchMove:boolean = false;
    score:number;
    scoreText: Phaser.Text;
    win:boolean = false;

    highestNumber:number;
    highestNumberText: Phaser.Text;

    constructor() {
        this.game = new Phaser.Game(800, 800, Phaser.AUTO, 'content', { create: this.create, update:this.update },true);
        this.tileSet = [];
        this.tileSetUpdate = [];
        this.tilesNumber = 4;
        this.tileHeight = 100;
        this.tileWidth = 100;
        this.score = 0;
        this.highestNumber = 2;

    }



    prepareTiles=()=>{

        var box= this.game.add.graphics(0,0);
        for(let i = 0; i< this.tilesNumber; i++){
            this.tileSet[i] = [];
            this.tileSetUpdate[i] = [];
            for(let j=0; j<this.tilesNumber; j++){
                let x = i* this.tileWidth;
                let y = j* this.tileHeight;
                this.tileSet[i][j] = {tile:Tile, used:false, updated:false};
                this.tileSetUpdate[i][j] = [];

                box.beginFill(0xbdc3c7);
                box.drawRect(x,y, this.tileWidth, this.tileHeight);
                box.lineStyle(1,0xecf0f1,1)
                box.endFill();

            }
        }
    };

    addTwo =() =>{
        do {
            var randX = Math.floor((Math.random() * 4));
            var randY = Math.floor((Math.random() * 4));
        }
        while (this.tileSet[randX][randY].used);

        this.tileSet[randX][randY].tile = new Tile(this.game,this.tileHeight,this.tileWidth,randX,randY,2);
        this.tileSet[randX][randY].used = true;


    };


    create = ()=> {
        this.highestNumberText = this.game.add.text(0,0,'',{});
        this.scoreText = this.game.add.text(0,0,'',{});
        this.prepareTiles();
        this.addTwo();
        this.addTwo();
        this.highestNumberText.text = this.highestNumber.toString();
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.canMove = true;

    };


    move = (x:number,y:number) =>{
        if(x<0|| y<0){
            this.moveReverse(x,y);
        }else {
            for (let i = 0; i < this.tilesNumber; i++) {
                for (let j = 0; j < this.tilesNumber; j++) {
                    if (this.tileSet[i][j].used) {
                        this.updateTile(i, j, x, y);
                    }

                }
            }
        }
    };

    moveReverse=(x:number,y:number) => {
        let max = this.tilesNumber-1;
        for(let i = max; i>=0; i--) {
            for (let j = max; j>=0; j--) {
                if(this.tileSet[i][j].used){
                    this.updateTile(i,j,x,y);
                }

            }
        }

    }

    updateTile=(i:number,j:number,x:number,y:number)=>{

        if((j+y>-1 && j+y<4) && (i+x>-1 && i+x<4)){

            if(!this.tileSet[i][j].updated && this.tileSet[i+x][j+y].used && (this.tileSet[i+x][j+y].tile.value === this.tileSet[i][j].tile.value )){

                    this.tileSet[i+x][j+y].tile.multiply();
                    this.tileSet[i+x][j+y].tile.value > this.highestNumber ? this.highestNumber =  this.tileSet[i+x][j+y].tile.value : '';
                    this.tileSet[i+x][j+y].updated = true;
                    this.tileSet[i][j].tile.deleteBox();
                    this.tileSet[i][j] = {tile:Tile, used:false};
                    this.moved = true;
            }
            else if(!this.tileSet[i+x][j+y].used){
                this.tileSet[i+x][j+y].updated = false;
                this.tileSet[i][j].tile.updatePosition(i+x,j+y);
                this.tileSet[i+x][j+y] = this.tileSet[i][j];
                this.tileSet[i][j] = {tile:Tile, used:false};
                this.moved = true;
            }

        }



    };


    update =() =>{
        this.updateText();
        this.countScore();


        if(this.highestNumber === 2048 && !this.win ){
            alert("Gratulacje wygrałes. Możesz grać dalej")
            this.win = true;
        }

        if(this.canMove) {
            if (this.cursors.left.isDown) {
                this.canMove = false;
                for(let i = 0; i<this.tilesNumber; i++){
                    this.move(-1,0);
                }
                this.canMove = true;

            }
            else if (this.cursors.right.isDown) {
                this.canMove = false;
                for(let i = 0; i<this.tilesNumber; i++){
                    this.move(1,0);
                }
                this.canMove = true;

            }
            else if (this.cursors.up.isDown) {
                this.canMove = false;
                for(let i = 0; i<this.tilesNumber; i++){
                    this.move(0,-1);
                }
                this.canMove = true;
            }
            else if (this.cursors.down.isDown) {
                this.canMove = false;
                for(let i = 0; i<this.tilesNumber; i++){
                    this.move(0,1);
                }
                this.canMove = true;
            }


        }


        if(this.moved && this.cursors.down.isUp && this.cursors.left.isUp && this.cursors.up.isUp && this.cursors.right.isUp){
            this.relaunchMove = false;
            this.moved = false;
            this.addTwo();
            this.prepareTileSet();
        }

    }

    prepareTileSet = () =>{
        for(let i = 0; i< this.tilesNumber; i++) {
            for (let j = 0; j < this.tilesNumber; j++) {
                this.tileSet[i][j].updated = false;
            }
        }

    }

    updateText =()=>{
        this.highestNumberText.x =10;
        this.highestNumberText.y = this.tilesNumber*this.tileHeight + 50;
        this.highestNumberText.text = 'Największa wartość: ' + this.highestNumber.toString();
    }

    countScore = () => {
        this.score = 0;
        for(let i = 0; i< this.tilesNumber; i++) {
            for (let j = 0; j < this.tilesNumber; j++) {
               if(this.tileSet[i][j].used){
                   this.score += this.tileSet[i][j].tile.value;
               }
            }
        }

        this.scoreText.x =10;
        this.scoreText.y = this.tilesNumber*this.tileHeight + 100;
        this.scoreText.text = 'Wynik: ' + this.score.toString();
    }





}

window.onload = () => {

    var game = new SimpleGame();

}