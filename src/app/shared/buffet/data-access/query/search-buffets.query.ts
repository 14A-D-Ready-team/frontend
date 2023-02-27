import { PaginationQuery, StringFilterQuery } from "@shared/api";
import { classTransformerConfig } from "@shared/serialization";
import { Expose, plainToInstance, Transform, Type, instanceToPlain } from "class-transformer";
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
      StringFilterQuery.isUnchanged(
        prev.searchString,
        curr.searchString,
      ) || 
      isEqual(
        prev.order,
        curr.order,
      )
    );
  }


  @Expose()
  @Type(() => StringFilterQuery)
  @IsOptional()
  @IsInstance(StringFilterQuery)
  @ValidateNested()
  @Transform(params => instanceToPlain(params.value, classTransformerConfig))
  public searchString?: StringFilterQuery;

  @Expose()
  @IsOptional()
  public order?: string;

  @Expose()
  @IsOptional()
  public orderByField? = "name";
  //public orderByField?: string; 



  constructor(model: Partial<SearchBuffetsQuery> = {}) {   
    super();
    const { searchString, ... rest } = model || {};
    Object.assign(this, rest);
    if (searchString) {
      this.searchString = StringFilterQuery.clone(searchString);
    }
  }
}
