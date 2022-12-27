import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { NumericFilterType } from "../numeric-filter-type.enum";

export class NumberFilterQuery {
  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  public min?: number;

  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  public max?: number;

  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  public value?: number;

  public type!: NumericFilterType;
}
