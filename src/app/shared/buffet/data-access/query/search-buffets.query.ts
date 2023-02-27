import { PaginationQuery, StringFilterQuery } from "@shared/api";
import { classTransformerConfig } from "@shared/serialization";
import {
  Expose,
  plainToInstance,
  Transform,
  Type,
  instanceToPlain,
} from "class-transformer";
import { IsInstance, IsOptional, ValidateNested } from "class-validator";
import { isEqual } from "lodash";

export class SearchBuffetsQuery extends PaginationQuery {
  // public static createOrCopy(
  //   existing: Partial<SearchBuffetsQuery> = {},
  // ): SearchBuffetsQuery {
  //   const rawCopy = JSON.parse(JSON.stringify(existing));

  //   return plainToInstance(SearchBuffetsQuery, rawCopy, {
  //     excludeExtraneousValues: true,
  //     exposeUnsetFields: false,
  //   });
  // }

  public static clone(query: SearchBuffetsQuery) {
    return new SearchBuffetsQuery(query);
  }

  public static isUnchanged(
    prev: SearchBuffetsQuery,
    curr: SearchBuffetsQuery,
  ) {
    return (
      isEqual(prev, curr) ||
      StringFilterQuery.isUnchanged(prev.search, curr.search) ||
      isEqual(prev.order, curr.order)
    );
  }

  @Expose()
  @IsOptional()
  @IsInstance(StringFilterQuery)
  @ValidateNested()
  @Transform(params => {
    console.log(params);
    return instanceToPlain(params.value, classTransformerConfig);
  })
  public search?: StringFilterQuery;

  @Expose()
  @IsOptional()
  public order?: string;

  @Expose()
  @IsOptional()
  public orderByField? = "name";
  //public orderByField?: string;

  constructor(model: Partial<SearchBuffetsQuery> = {}) {
    super();
    const { search: searchString, ...rest } = model || {};
    Object.assign(this, rest);
    if (searchString) {
      this.search = StringFilterQuery.clone(searchString);
    }
  }
}
