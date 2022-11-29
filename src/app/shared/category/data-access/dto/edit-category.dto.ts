import { Exclude, Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Category } from "../entity";

export class EditCategoryDto {
  @Exclude()
  public id: number;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  public name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
