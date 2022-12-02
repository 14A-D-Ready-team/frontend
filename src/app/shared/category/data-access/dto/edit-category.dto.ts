import { Exclude, Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Category } from "../entity";

export class EditCategoryDto {
  @Exclude()
  public id: number;

  @Expose()
  @IsString()
  @MinLength(1, { message: "A kategória neve nem lehet üres" })
  @MaxLength(80, {
    message: "A kategória neve nem lehet hosszabb 80 karakternél",
  })
  public name: string;

  constructor(category?: Category) {
    this.id = category?.id || -1;
    this.name = category?.name || "";
  }
}
