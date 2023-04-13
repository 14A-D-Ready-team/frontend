import { CreateProductDto, UpdateProductDto } from "../dto";
import { Product } from "../entity";
import { FilterProductsQuery } from "../query";
import { EntityActions } from "@shared/extended-entity-state";

export class Load extends EntityActions.Load<FilterProductsQuery> {
  public static readonly type = `[Product] Load`;
}

export class LoadById {
  public static readonly type = `[Product] Load By Id`;

  constructor(public id: number) {}
}

export class LoadingFailed extends EntityActions.LoadingFailed {
  public static readonly type = `[Product API] Loading Failed`;
}

export class LoadingSucceeded extends EntityActions.LoadingSucceeded<
  Product,
  FilterProductsQuery
> {
  public static readonly type = `[Product API] Loading Succeeded`;
}

export class Create extends EntityActions.Create<CreateProductDto> {
  public static readonly type = `[Product] Create`;
}

export class CreateFailed extends EntityActions.CreateFailed {
  public static readonly type = `[Product API] Create Failed`;
}

export class CreateSucceeded extends EntityActions.CreateSucceeded<Product> {
  public static readonly type = `[Product API] Create Succeeded`;
}

export class Update extends EntityActions.Update<UpdateProductDto> {
  public static readonly type = `[Product] Update`;
}

export class UpdateFailed extends EntityActions.UpdateFailed {
  public static readonly type = `[Product API] Update Failed`;
}

export class UpdateSucceeded extends EntityActions.UpdateSucceeded<Product> {
  public static readonly type = `[Product API] Update Succeeded`;
}

export class Delete extends EntityActions.Delete {
  public static readonly type = `[Product] Delete`;
}

export class DeleteFailed extends EntityActions.DeleteFailed {
  public static readonly type = `[Product API] Delete Failed`;
}

export class DeleteSucceeded extends EntityActions.DeleteSucceeded {
  public static readonly type = `[Product API] Delete Succeeded`;
}
export class SetAllLoaded {
  public static readonly type = "[Product] Set All Loaded";

  constructor(public isAllLoaded: boolean) {}
}
