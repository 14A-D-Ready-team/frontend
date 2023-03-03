import { Expose } from "class-transformer";
import { User } from "./user.entity";

export class BuffetOwner {
  @Expose()
  public buffetIds!: number[];
}
