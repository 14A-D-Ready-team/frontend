import { PaginationQuery, StringFilterQuery } from "@shared/api";
import { Expose, plainToInstance, Type } from "class-transformer";
import { IsInstance, IsOptional, ValidateNested } from "class-validator";

export class SearchBuffetsQuery extends PaginationQuery {
  public static createOrCopy(
    existing: Partial<SearchBuffetsQuery> = {},
  ): SearchBuffetsQuery {
    const rawCopy = JSON.parse(JSON.stringify(existing));

    return plainToInstance(SearchBuffetsQuery, rawCopy, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }

  @Expose()
  @Type(() => StringFilterQuery)
  @IsOptional()
  @IsInstance(StringFilterQuery)
  @ValidateNested()
  public searchName?: StringFilterQuery;
}
