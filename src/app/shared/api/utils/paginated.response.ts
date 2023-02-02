import { Expose, Transform } from "class-transformer";

export class PaginatedResponse<T> {
  @Expose()
  public items!: T[];

  @Expose()
  public count!: number;
}
