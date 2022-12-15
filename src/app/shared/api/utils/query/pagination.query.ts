import { Expose } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationQuery {
  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(0)
  public skip?: number;

  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(0)
  public take?: number;
}
