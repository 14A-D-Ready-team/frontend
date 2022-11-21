import { Expose } from "class-transformer";

export class Option {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public extraCost!: number;
}
