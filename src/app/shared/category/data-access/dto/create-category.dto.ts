import { Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  public name!: string;
}
