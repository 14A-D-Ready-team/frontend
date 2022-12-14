import { Expose } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateProductDto {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  public name!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  public description!: string;

  @Expose()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  public fullPrice!: number;

  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  public discountedPrice!: number | null;

  @Expose()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(0)
  public stock!: number;

  @Expose()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  public categoryId!: number;
}
