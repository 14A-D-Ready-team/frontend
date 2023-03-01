import { Expose } from "class-transformer";
import { Buffet } from "./buffet.entity";

export class BuffetInviteToken {
  @Expose()
  public id!: string;

  @Expose()
  public buffet!: Buffet;

  constructor(id: string, buffet: Buffet) {
    this.id = id;
    this.buffet = buffet;
  }
}
