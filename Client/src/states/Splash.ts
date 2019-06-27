import * as Phaser from 'phaser-ce'
import { centerGameObjects } from '../utils'
import { container } from 'tsyringe';
import { ConnectionService } from '../services/ConnectionService';
import { TextStyle } from '../Style/TextStyle';

export class SplashState extends Phaser.State {
  loaderBg: Phaser.Sprite;
  loaderBar: Phaser.Sprite;

  init () {
    container.registerSingleton(ConnectionService);
    container.resolve(ConnectionService).init(this.game);
  }

  preload () {

    this.game.stage.disableVisibilityChange = true; 
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('berekCircle', 'assets/images/berek_circle.png')
    this.load.image('noBerekCircle', 'assets/images/no_berek_circle.png')
  }

  create () { }
}
