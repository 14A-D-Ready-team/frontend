import { NumberFilterQuery, PaginationQuery } from "@shared/api";
import { Expose, Type } from "class-transformer";
import {
  IsInstance,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from "class-validator";
import { isEqual } from "lodash";

export class FilterProductsQuery extends PaginationQuery {
  public static isUnchanged(
    prev: FilterProductsQuery,
    curr: FilterProductsQuery,
  ) {
    const numberFiltersUnchanged =
      NumberFilterQuery.isUnchanged(
        prev.discountedPrice,
        curr.discountedPrice,
      ) &&
      NumberFilterQuery.isUnchanged(prev.fullPrice, curr.fullPrice) &&
      NumberFilterQuery.isUnchanged(prev.stock, curr.stock);

    const categoryIdUnchanged = prev.categoryId === curr.categoryId;

    return categoryIdUnchanged && numberFiltersUnchanged;
  }

  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  public categoryId?: number;

  @Expose()
  public buffetId?: number;

  @Expose()
  @Type(() => NumberFilterQuery)
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public fullPrice?: NumberFilterQuery;

  @Expose()
  @Type(() => NumberFilterQuery)
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public discountedPrice?: NumberFilterQuery;

  @Expose()
  @Type(() => NumberFilterQuery)
  @IsOptional()
  @IsInstance(NumberFilterQuery)
  @ValidateNested()
  public stock?: NumberFilterQuery;

  constructor(existing: Partial<FilterProductsQuery> = {}) {
    super();
    const { fullPrice, discountedPrice, stock, ...rest } = existing;
    Object.assign(this, rest);
    if (fullPrice) {
      this.fullPrice = new NumberFilterQuery(fullPrice);
    }
    if (discountedPrice) {
      this.discountedPrice = new NumberFilterQuery(discountedPrice);
    }
    if (stock) {
      this.stock = new NumberFilterQuery(stock);
    }
  }
}
