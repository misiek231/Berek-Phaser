import * as Phaser from 'phaser-ce'
import { centerGameObjects } from '../utils'
import { container } from 'tsyringe';
import { ConnectionService } from '../services/ConnectionService';
import { TextStyle } from '../Style/TextStyle';

export class MenuState extends Phaser.State {


  optionCount: number;
  titleText: Phaser.Text;

  addMenuOption(text: string, callback: Function) {

    var textStyle = new TextStyle();

    console.log(textStyle);

    var txt: Phaser.Text = this.game.add.text(30, (this.optionCount * 80) + 200, text, textStyle.defaultStyle);
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback);
    txt.events.onInputOver.add(function (target : Phaser.Text) {
      target.setStyle(textStyle.hoverStyle);
    });
    txt.events.onInputOut.add(function (target: Phaser.Text) {
      target.setStyle(textStyle.defaultStyle);
    });
    this.optionCount ++;
  }

  init() {
    this.titleText = this.game.make.text(this.game.world.centerX, 100, "Game Title", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  }

  create() {
    this.game.stage.disableVisibilityChange = true;

    //this.game.add.sprite(0, 0, 'menu-bg');
    this.game.add.existing(this.titleText);

    this.addMenuOption('Start', function () {
      container.resolve(ConnectionService).joinRoom();
    });
    this.addMenuOption('Options', function () {
      console.log('You clicked Options!');
    });
    this.addMenuOption('Credits', function () {
      console.log('You clicked Credits!');
    });
  }
  
}
