import * as Phaser from 'phaser-ce'
import { centerGameObjects } from '../utils'
import { container } from 'tsyringe';
import { ConnectionService } from '../services/ConnectionService';
import { TextStyle } from '../Style/TextStyle';

export class WaitingState extends Phaser.State {


  optionCount: number;
  titleText: Phaser.Text;

  init() {
    this.titleText = this.game.make.text(this.game.world.centerX, 100, "Oczekiwanie na gracza", {
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
    this.game.add.existing(this.titleText);
  }
}
