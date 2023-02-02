import { CreateProductDto } from "../dto";
import { Product } from "../entity";
import { FilterProductsQuery } from "../query";

export class Load {
  public static type = "[Product] Load";

  constructor(public query: FilterProductsQuery) {}
}

export class LoadingSucceeded {
  public static type = "[Product API] Loading Succeeded";

  constructor(
    public query: FilterProductsQuery,
    public products: Product[],
    public count: number,
  ) {}
}

export class LoadingFailed {
  public static type = "[Product API] Loading Failed";

  constructor(public error: any) {}
}

export class Create {
  public static readonly type = "[Product] Create";

  constructor(public payload: CreateProductDto) {}
}

export class CreateFailed {
  public static readonly type = "[Product API] Create Failed";

  constructor(public error: any) {}
}

export class CreateSucceeded {
  public static readonly type = "[Product API] Create Succeeded";

  constructor(public product: Product) {}
}
