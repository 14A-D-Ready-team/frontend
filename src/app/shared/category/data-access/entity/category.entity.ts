import { Expose } from "class-transformer";

export class Category {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public buffet_id!: number;

  constructor(id: number, name: string, buffet_id: number) {
    this.id = id;
    this.name = name;
    this.buffet_id = buffet_id;
  }
}
