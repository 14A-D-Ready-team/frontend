import { NumberFilterQuery, PaginationQuery } from "@shared/api";
import { Expose } from "class-transformer";
import {
  IsInstance,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from "class-validator";

export class FilterProductsQuery extends PaginationQuery {
  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  public categoryId?: number;

  @Expose()
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public fullPrice?: NumberFilterQuery;

  @Expose()
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public discountedPrice?: NumberFilterQuery;

  @Expose()
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public stock?: NumberFilterQuery;
}
