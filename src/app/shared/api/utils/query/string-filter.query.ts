import {
  Expose, Transform,
} from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class StringFilterQuery {
  public static isEmpty(obj?: StringFilterQuery) {
    return (
      // eslint-disable-next-line eqeqeq
      obj?.searchString == undefined
    );
  }

  public static isUnchanged(
    previous?: StringFilterQuery,
    current?: StringFilterQuery,
  ) {
    return (
      previous?.searchString !== current?.searchString &&
      StringFilterQuery.isEmpty(previous) &&
      StringFilterQuery.isEmpty(current)
    );
  }
  
  @Expose()
  @IsOptional()
  @IsString(
    { message: "A keresésnek szövegnek kell lennie!" },
  )
  public searchString?: string;
}
