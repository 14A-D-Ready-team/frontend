import { Expose, Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class StringFilterQuery {
  @Expose()
  @IsOptional()
  @IsString({ message: "A keresésnek szövegnek kell lennie!" })
  public searchString?: string;

  constructor(model?: Partial<StringFilterQuery>) {
    Object.assign(this, model);
  }
}
