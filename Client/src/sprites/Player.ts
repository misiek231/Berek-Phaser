import * as Phaser from 'phaser-ce'
import { ConnectionService } from '../services/ConnectionService';
import { SocketEvents } from '../statics/socketEvents';
import { PlayerState } from '../schema/PlayerState';

export default class extends Phaser.Sprite {
  
  game: Phaser.Game;

  isLocal: boolean;

  inputX: number = 0;
  inputY: number = 0;
	nick: string;
  isBerek: boolean = false;

  state: PlayerState;

  i: number;

  connectionService: ConnectionService;

  constructor ({ game, asset, isLocal, connectionService, nick, state} : {
    game: Phaser.Game, // Note: Phaser.Game, but cannot bind this to Phaser.Game type
    asset: string | Phaser.RenderTexture | Phaser.BitmapData ,
    isLocal: boolean,
    connectionService: ConnectionService,
    nick: string,
    state : PlayerState 
  }) {
    super(game, 0, 0, asset)
    this.width = 30;
    this.height = 30;
    this.anchor.setTo(0.5)
    this.game = game;
    this.isLocal = isLocal;
    this.connectionService = connectionService;
    this.nick = nick;
    this.state = state;
  }

  update () {
    //console.log(this.isLocal);
    if(this.isLocal){  
      this.updateInput();
     // console.log({inputX: this.inputX, inputY: this.inputY});
      this.connectionService.room.send({message: 'input', inputX: this.inputX, inputY: this.inputY});
    }    
    this.updatePlayer(this.game.time.elapsed/30);
  }
  
  updateInput(){
    var keyboard = this.game.input.keyboard;
    
    this.inputY = 0;
    this.inputX = 0;

    if(keyboard.isDown(Phaser.KeyCode.W)){
      this.inputY = -50;
    }
      

    if(keyboard.isDown(Phaser.KeyCode.S)){
      this.inputY = 50;
    }
      

    if(keyboard.isDown(Phaser.KeyCode.A)){
      this.inputX = -50;
    }
      

    if(keyboard.isDown(Phaser.KeyCode.D)){
     this.inputX = 50;
    }
  }
	
	updatePlayer(delta: number){
    this.x = Phaser.Math.linearInterpolation([this.x, this.state.x], delta)
    this.y = Phaser.Math.linearInterpolation([this.y, this.state.y], delta)
    console.log(this.nick, this.state.isBerek)
    if(this.isBerek != this.state.isBerek){
      this.isBerek = this.state.isBerek;
      if(this.isBerek)
        this.loadTexture('berekCircle')
      else
        this.loadTexture('noBerekCircle')
    }  
	}
}
