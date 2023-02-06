import { createActions } from "@shared/extended-entity-state";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { Product } from "../entity";
import { FilterProductsQuery } from "../query";

const {
  Create,
  CreateFailed,
  CreateSucceeded,
  Delete,
  DeleteFailed,
  DeleteSucceeded,
  Load,
  LoadingFailed,
  LoadingSucceeded,
  Update,
  UpdateFailed,
  UpdateSucceeded,
} = createActions<
  Product,
  FilterProductsQuery,
  CreateProductDto,
  UpdateProductDto
>("Product");

export {
  Create,
  CreateFailed,
  CreateSucceeded,
  Delete,
  DeleteFailed,
  DeleteSucceeded,
  Load,
  LoadingFailed,
  LoadingSucceeded,
  Update,
  UpdateFailed,
  UpdateSucceeded,
};

/* export class Load {
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
 */
