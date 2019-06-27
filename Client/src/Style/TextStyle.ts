import { PhaserTextStyle } from 'phaser-ce'

export class TextStyle{

    defaultStyle: PhaserTextStyle = {};
    hoverStyle: PhaserTextStyle = {};

    defaultColor = "white"
    highlightColor = "#FEFFD5";

    constructor(){

        

        this.defaultStyle.font = '30pt TheMinion';
        this.defaultStyle.align = 'left';
        this.defaultStyle.strokeThickness = 4;

        this.hoverStyle.font = '30pt TheMinion';
        this.hoverStyle.align = 'left';
        this.hoverStyle.strokeThickness = 4;

        this.defaultStyle.fill = this.defaultColor;
        this.defaultStyle.stroke = 'rgba(0,0,0,0)';

        this.hoverStyle.fill = this.highlightColor;
        this.hoverStyle.stroke = 'rgba(200,200,200,0.5)';

    }
}