import { Expose } from "class-transformer";

export class Category {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public buffetId!: number;

  constructor(id: number, name: string, buffetId: number) {
    this.id = id;
    this.name = name;
    this.buffetId = buffetId;
  }
}
