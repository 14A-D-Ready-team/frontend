import { Expose } from "class-transformer";

export class Category {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
