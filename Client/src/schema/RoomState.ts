import { Schema, type, ArraySchema, MapSchema, DataChange } from "@colyseus/schema";
import { PlayerState } from "./PlayerState";

export class RoomState extends Schema {
	@type({ map: PlayerState }) public players: MapSchema<PlayerState> = new MapSchema<PlayerState>();
}
