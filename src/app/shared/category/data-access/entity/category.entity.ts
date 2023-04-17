import { Expose } from "class-transformer";

export class Category {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public buffetId!: number;

  constructor(data: Partial<Category> = {}) {
    Object.assign(this, data);
  }
}
