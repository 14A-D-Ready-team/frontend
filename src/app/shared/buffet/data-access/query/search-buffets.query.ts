import { PaginationQuery } from "@shared/api";
import { Expose, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

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
  @IsString()
  @IsNotEmpty()
  public search!: string;
}
