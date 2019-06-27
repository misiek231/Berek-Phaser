import 'pixi'
import 'p2'
import * as Phaser from 'phaser-ce';
import "reflect-metadata";
import { BootState } from './states/Boot'
import { SplashState } from './states/Splash'
import { GameState } from './states/Game'
import { MenuState } from './states/Menu';
import { WaitingState } from './states/Waiting';

declare global {
  interface Window { game: any; }
}
window.game = window.game || {};



class Game extends Phaser.Game {
  constructor () {

    const docElement = document.documentElement
    const width = 1200;// docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = 600; // docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight
    super(width, height, Phaser.AUTO, 'content', null)

     this.state.add('Boot', BootState, false)
     this.state.add('Splash', SplashState, false)
     this.state.add('Game', GameState, false)
     this.state.add('Menu', MenuState, false)
     this.state.add('Waiting', WaitingState, false)
   
     this.state.start('Boot');
  }
}

window.game = new Game()
//console.log(FBInstant);

// FBInstant.initializeAsync().then(() => {
//   FBInstant.setLoadingProgress(100);
//   FBInstant.startGameAsync().then(()=>{ 
//     FBInstant.context
//     .chooseAsync()
//     .then(function() {
//       console.log(FBInstant.context.getID());
//     // 1234567890
//     });
//   });
// });



//https://www.facebook.com/embed/instantgames/453225242107642/player?game_url=http://localhost:3000

