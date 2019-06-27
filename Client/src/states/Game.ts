declare var __DEV__: string;

import * as Phaser from 'phaser-ce'
import Player from '../sprites/Player'
import { container } from 'tsyringe';
import { ConnectionService } from '../services/ConnectionService';
import { PlayerState } from '../schema/PlayerState';

export class GameState extends Phaser.State {

  init () {}
  preload () {
    
    this.game.stage.disableVisibilityChange = true; 
  }

  connectionService: ConnectionService;

  create () {
    console.log('create');
    const bannerText = 'Berek'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.connectionService = container.resolve(ConnectionService);

  // console.log(this.connectionService.room.state);

    for (let key in this.connectionService.room.state.players) { 

      let playerState: PlayerState = this.connectionService.room.state.players[key];
      //console.log( playerState.nick, this.connectionService.nick);
      let newPlayer : Player = new Player({
        game: this.game,
        asset: 'berekCircle',
        isLocal: playerState.nick === this.connectionService.nick,
        connectionService: this.connectionService,
        nick: playerState.nick,
        state: playerState
      })

      this.game.add.existing(newPlayer);
    }; 
  }

  render () {
    //console.log(this.connectionService.room.state);
  }
}
