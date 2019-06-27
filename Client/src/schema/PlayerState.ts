// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 0.4.34
// 

import { Schema, type, ArraySchema, MapSchema, DataChange } from "@colyseus/schema";


export class PlayerState extends Schema {
	@type("number") public x: number;
	@type("number") public y: number;
	@type("string") public nick: string;
	@type("boolean") public isBerek: boolean;
}
