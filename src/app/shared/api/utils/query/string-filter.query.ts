import { Expose, Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class StringFilterQuery {
  public static isUnchanged(
    previous?: StringFilterQuery,
    current?: StringFilterQuery,
  ) {
    return previous?.searchString === current?.searchString;
  }

  @Expose()
  @IsOptional()
  @IsString({ message: "A keresésnek szövegnek kell lennie!" })
  public searchString?: string;

  constructor(model?: Partial<StringFilterQuery>) {
    Object.assign(this, model);
  }
}
