import * as Colyseus from "colyseus.js";
import { RoomState } from "../schema/RoomState";
import { GameState } from "../states/Game";
import { DataChange } from "@colyseus/schema";

export class ConnectionService{

    nick: string;
    room: Colyseus.Room<RoomState>;
    client: Colyseus.Client;
    game: Phaser.Game;
    started: boolean;

    init(game: Phaser.Game){
        this.game = game;
        this.client = new Colyseus.Client('wss://server.berek.ml');   
       // this.client = new Colyseus.Client('ws://localhost:2567');   
        this.started = false;   
        this.client.onOpen.add(() => {
            this.game.state.start('Menu');
        })
    }

    joinRoom(){

        this.game.state.start('Waiting');

        this.nick = Math.random().toString(36).substring(7)
        this.room = this.client.join<RoomState>("my_room", {nick: this.nick}, RoomState);

        this.room.onJoin.add(() => {
            console.log(this.client.id, "joined", this.room.name);
        });

        this.room.onStateChange.add(() =>{
            if(!this.started){
                this.room.send({ message: "ready", ready: Object.values(this.room.state.players).length >= 2});
            }
        });

        this.room.onLeave.add(() => {
            this.game.state.start('Splash');
        })

        this.room.onMessage.add((message: any) => {     
            console.log(message);
   
            if(message === 'start'){
                this.started = true;
                this.game.state.start('Game');
            }     
        }) 
    }
}