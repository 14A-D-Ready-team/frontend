import { NumberFilterQuery, PaginationQuery } from "@shared/api";
import { deleteEmptyPropertiesDeep } from "@shared/serialization";
import { Expose, plainToInstance, Type } from "class-transformer";
import {
  IsInstance,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from "class-validator";

export class FilterProductsQuery extends PaginationQuery {
  public static createOrCopy(
    existing: Partial<FilterProductsQuery> = {},
  ): FilterProductsQuery {
    const rawCopy = JSON.parse(JSON.stringify(existing));

    return deleteEmptyPropertiesDeep(
      plainToInstance(FilterProductsQuery, rawCopy, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      }),
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
