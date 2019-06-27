import { Room, Client } from "colyseus";
import { RoomState, PlayerState } from './RoomState'
import { number } from "@colyseus/schema/lib/encoding/decode";

export class MyRoom extends Room<RoomState> {

  gameStarted: boolean = false;

  onInit (options: any) {
    this.setState(new RoomState());
    this.setSimulationInterval((deltaTime) => this.update(deltaTime), 20);
    this.patchRate = 20;
  }

  update (deltaTime: number) {
    if(this.gameStarted)
      this.updatePosition(deltaTime)
    else{
      if(Object.keys(this.state.players).length >= 2 && this.state.checkIfPlayersReady()){
        this.state.players[Object.keys(this.state.players)[0]].isBerek = true;
        this.broadcast('start');
        this.lock();
        this.gameStarted = true;
      }
    }
  }

  onJoin (client: Client, options: any) {
    console.log(options)
    this.state.newPlayer(client, options.nick);
  }
  onMessage (client: Client, message: any) {
   
    if(message.message == 'input')
      this.state.updateInput(client, message);

    if(message.message == 'ready')
      this.state.setReady(client, message.ready)
  }

  onLeave (client: Client, consented: boolean) {
    this.state.removePlayer(client);
    this.disconnect();
  }

  onDispose() {}

  updatePosition(delta: number){
    delta = delta/1000;
    let players: PlayerState[] = Object.values(this.state.players);
    for (let i: number = 0; i < players.length; i++) { 
      let player: PlayerState = players[i];
      player.setForceX(player.inputX * 10, delta);
      player.setForceY(player.inputY * 10, delta);
      player.x += player.forceX * (delta);		
      player.y += player.forceY * (delta);          
      player.forceX /= 1.1;	
      player.forceY /=  1.1;
      this.checkIfOverlaps(i, players);
      player.checkReflection();
    }
  }

  checkIfOverlaps(playerId: number, players: PlayerState[]){
    for (let i = playerId + 1; i < players.length; i++) {
      let player1: PlayerState = players[playerId];
      let player2: PlayerState = players[i];;
      let a = player1.checkIfOverlaps(player2);
      if(a != null){
        player1.forceX = a.forceX;
        player1.forceY = a.forceY;
        player2.forceX = -a.forceX;
        player2.forceY = -a.forceY;
        if(player1.isBerek || player2.isBerek){
            player1.isBerek = !player1.isBerek;
            player2.isBerek = !player2.isBerek;
        }
      }           
    }
  }
}
