import { Expose } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class FilterCategoriesQuery {
  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  public buffetId?: number;

  constructor(buffetId?: number) {
    this.buffetId = buffetId;
  }
}
