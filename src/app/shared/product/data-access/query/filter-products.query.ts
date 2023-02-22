import { NumberFilterQuery, PaginationQuery } from "@shared/api";
import {
  classTransformerConfig,
  deleteEmptyPropertiesDeep,
} from "@shared/serialization";
import {
  Expose,
  instanceToPlain,
  plainToInstance,
  Type,
} from "class-transformer";
import {
  IsInstance,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from "class-validator";
import { isEqual } from "lodash";

export class FilterProductsQuery extends PaginationQuery {
  public static createOrCopy(
    existing: Partial<FilterProductsQuery> = {},
  ): FilterProductsQuery {
    const rawCopy = JSON.parse(JSON.stringify(existing));

    return plainToInstance(
      FilterProductsQuery,
      rawCopy as unknown,
      classTransformerConfig,
    );
  }

  public static isUnchanged(
    prev: FilterProductsQuery,
    curr: FilterProductsQuery,
  ) {
    return (
      isEqual(prev, curr) ||
      NumberFilterQuery.isUnchanged(
        prev.discountedPrice,
        curr.discountedPrice,
      ) ||
      NumberFilterQuery.isUnchanged(prev.fullPrice, curr.fullPrice) ||
      NumberFilterQuery.isUnchanged(prev.stock, curr.stock)
    );
  }

  @Expose()
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @Min(1)
  public categoryId?: number;

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
}
