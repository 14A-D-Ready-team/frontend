import { Expose } from "class-transformer";
import { BuffetInviteToken } from "./buffet-invite-token.entity";
import { BuffetStatus } from "./buffet-status.entity";

export class Buffet {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public coords!: string;

  @Expose()
  public address!: string;

  @Expose()
  public hours?: string;

  @Expose()
  public description?: string;

  @Expose()
  public status!: BuffetStatus;

  @Expose()
  public buffetOwnerId!: number;

  @Expose()
  public employees!: number[];

  @Expose()
  public inviteTokens!: BuffetInviteToken[];

  constructor (id: number, name: string, coords: string, address: string, hours: string, description: string, status: BuffetStatus, ownerId: number, emloyees: number[], inivteTokens: BuffetInviteToken[]) {
    this.id = id;
    this.name = name;
    this.coords = coords;
    this.address = address;
    this.hours = hours;
    this.description = description;
    this.status = status;
    this.buffetOwnerId = ownerId;
    this.employees = emloyees;
    this.inviteTokens = inivteTokens;
  }
}
