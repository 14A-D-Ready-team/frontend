import { PaginationQuery, StringFilterQuery } from "@shared/api";
import { classTransformerConfig } from "@shared/serialization";
import { Expose, Transform, instanceToPlain } from "class-transformer";
import { IsInstance, IsOptional, ValidateNested } from "class-validator";
import { isEqual } from "lodash";

export class SearchBuffetsQuery extends PaginationQuery {
  public static isUnchanged(
    prev: SearchBuffetsQuery,
    curr: SearchBuffetsQuery,
  ) {
    return isEqual(prev, curr);
  }

  @Expose()
  @IsOptional()
  @IsInstance(StringFilterQuery)
  @ValidateNested()
  @Transform(params => instanceToPlain(params.value, classTransformerConfig))
  public search?: StringFilterQuery;

  @Expose()
  @IsOptional()
  public order?: string;

  @Expose()
  @IsOptional()
  public orderByField? = "name";
  //public orderByField?: string;

  @Expose()
  public own?: boolean;

  constructor(model: Partial<SearchBuffetsQuery> = {}) {
    super();
    const { search: searchString, ...rest } = model || {};
    Object.assign(this, rest);
    if (searchString) {
      this.search = new StringFilterQuery(searchString);
    }
  }
}
