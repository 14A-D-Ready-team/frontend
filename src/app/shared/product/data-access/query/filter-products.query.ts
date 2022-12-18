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

  constructor({
    categoryId,
    discountedPrice,
    fullPrice,
    stock,
    skip,
    take,
  }: FilterProductsQuery = {}) {
    super();
    this.categoryId = categoryId;
    this.discountedPrice = !discountedPrice
      ? undefined
      : new NumberFilterQuery(discountedPrice);
    this.fullPrice = !fullPrice ? undefined : new NumberFilterQuery(fullPrice);
    this.stock = !stock ? undefined : new NumberFilterQuery(stock);
    this.skip = skip;
    this.take = take;
  }
}
