/**
 * Created by Olek on 18.08.2016.
 */



class Tile {
    x:number;
    y:number;
    value:number;
    game: Phaser.Game;
    box: Phaser.Graphics;
    tileWidth:number;
    tileHeight:number;

    tileText:Phaser.Text;

    constructor(game:Phaser.Game,tileWidth:number,tileHeight:number,newX:number,newY:number, newValue:number){
        this.game = game;
        this.tileHeight = tileHeight;
        this.tileWidth = tileWidth;
        this.x = newX*tileWidth;
        this.y = newY*tileHeight;
        this.value = newValue;
        this.box= this.game.add.graphics(0,0);
        this.tileText = this.game.add.text(0,0,'',{});
        this.draw();
    }

    draw = () =>{

        this.box.beginFill(0xf39c12);
        this.box.drawRect(this.x,this.y, this.tileWidth, this.tileHeight);
        this.box.endFill();

        this.updateText();
    };

    updatePosition=(newX:number,newY:number)=>{


        this.x = newX*this.tileWidth;
        this.y = newY*this.tileHeight;
        this.box.clear();
        this.draw();

    };

    updateText=()=>{
        this.tileText.x = Math.floor(this.x+this.tileWidth/2);
        this.tileText.y = Math.floor(this.y+this.tileHeight/2);
        this.tileText.text = this.value.toString();
    }
    
    multiply=()=>{
        this.value = this.value *2;
        this.updateText();
    }

    deleteBox = () =>{
        this.box.clear();
        this.tileText.text = "";
    }

}


export default Tile;