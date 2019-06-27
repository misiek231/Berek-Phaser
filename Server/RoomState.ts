import { Schema, type, MapSchema } from "@colyseus/schema";
import { Client } from "colyseus";
import { Constants } from "./Constants";

export class PlayerState extends Schema {
    @type("number")
    x: number = 0;

    @type("number")
    y: number = 0;

    @type("string")
    nick: string = '';

    inputX:number = 0;
    inputY: number = 0;

    forceX:number = 0;
	forceY: number = 0;
	
	width: number = 30;
	height: number = 30;

    @type("boolean")
    isBerek: boolean = false;

    ready: boolean = false;

    constructor(nick: string){
        super();
        this.nick = nick;
    }
    
    setForceX(forceX: number, delta: number){
		
		if(forceX > 0){
			
			if(this.forceX < forceX)
		//	console.log('thisforce: ' + this.forceX + 'newforce: ' + forceX);
			
				this.forceX += forceX * (delta * 2);
		}
		
		if(forceX < 0){
			
			if(this.forceX > forceX)			
				this.forceX += forceX * (delta * 2);
		}
						
	}
	
	setForceY(forceY: number, delta: number){
		
		if(forceY > 0){
			
			if(this.forceY < forceY)			
				this.forceY += forceY * (delta * 2);
		}
		
		if(forceY < 0){
			
			if(this.forceY > forceY)			
				this.forceY += forceY * (delta * 2);
		}	
	}	

	checkIfOverlaps(player: PlayerState) : {forceX: number, forceY: number} | null{
        if(this.x < player.x + player.width && this.x + this.width > player.x && this.y < player.y + player.height && this.y + this.height > player.y){		 
		 	let forceX = (this.x - player.x) * 10;
		 	let forceY = (this.y - player.y) * 10;
		 	return {forceX: forceX, forceY: forceY};
		}
		else return null;
    }
    
    checkReflection(){

        if(this.x < 0 + this.width / 2)
            this.forceX = 300;

        if(this.x > Constants.GAME_WIDTH - this.width / 2)
            this.forceX = -300

        if (this.y < 0 + this.height / 2)
            this.forceY = 300

        if (this.y > Constants.GAME_HEIGHT - this.height / 2)
            this.forceY = -300
    }
}

export class RoomState extends Schema {
    @type({ map: PlayerState })
    players:MapSchema<PlayerState> = new MapSchema<PlayerState>();

    updateInput(client: Client, input: any){
        let player = this.players[client.sessionId];
        player.inputX = input.inputX;
        player.inputY = input.inputY;
        //console.log(player.nick, input)
    }

    setReady(client: Client, ready: boolean){
        let player = this.players[client.sessionId];
        player.ready = ready;
    }

    checkIfPlayersReady(): boolean{
        var ready = true;
        for (let key in this.players) { 
            if(!this.players[key].ready)
                ready = false;
        }
        return ready;
    }

    newPlayer(client: Client, nick: string){
        this.players[client.sessionId] = new PlayerState(nick);
        //console.log(this.players._indexes);
    }

    removePlayer(client: Client){
       delete this.players[client.sessionId];
    }
}