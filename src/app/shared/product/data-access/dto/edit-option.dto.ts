import { Expose } from "class-transformer";

export class EditOptionDto {
  @Expose()
  public name!: string;

  @Expose()
  public extraCost!: number;
}
