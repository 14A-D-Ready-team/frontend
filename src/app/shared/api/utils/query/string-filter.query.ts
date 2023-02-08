import {
  Expose,
} from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class StringFilterQuery {
  public static isEmpty(obj?: StringFilterQuery) {
    return (
      // eslint-disable-next-line eqeqeq
      obj?.searchString == undefined
    );
  }
  
  @Expose()
  @IsOptional()
  @IsString(
    { message: "A keresésnek szövegnek kell lennie!" },
  )
  public searchString?: string;
}
