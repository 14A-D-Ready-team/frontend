import { PaginationQuery, StringFilterQuery } from "@shared/api";
import { Expose, plainToInstance, Type } from "class-transformer";
import { IsInstance, IsOptional, ValidateNested } from "class-validator";
import { isEqual } from "lodash";

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

  
  public static isUnchanged(
    prev: SearchBuffetsQuery,
    curr: SearchBuffetsQuery,
  ) {
    return (
      isEqual(prev, curr) ||
      StringFilterQuery.isUnchanged(
        prev.searchString,
        curr.searchString,
      ) ||
      StringFilterQuery.isUnchanged(prev.searchString, curr.searchString)
    );
  }


  @Expose()
  @Type(() => StringFilterQuery)
  @IsOptional()
  @IsInstance(StringFilterQuery)
  @ValidateNested()
  public searchString?: StringFilterQuery;

  @Expose()
  @Type(() => StringFilterQuery)
  @IsOptional()
  @IsInstance(StringFilterQuery)
  @ValidateNested()
  public order?: StringFilterQuery;
}
