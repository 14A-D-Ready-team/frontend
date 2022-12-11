import { Expose } from "class-transformer";

export class Option {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public extraCost!: number;

  constructor(id: number, name: string, extraCost: number) {
    this.id = id;
    this.name = name;
    this.extraCost = extraCost;
  }
}
