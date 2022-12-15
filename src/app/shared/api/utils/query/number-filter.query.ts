import { Expose } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

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
}
