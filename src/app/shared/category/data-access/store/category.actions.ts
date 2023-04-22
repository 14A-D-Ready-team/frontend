import { EntityActions } from "@shared/extended-entity-state";
import { EditCategoryDto } from "../dto";
import { Category } from "../entity";
import { FilterCategoriesQuery } from "../query";

export class Load extends EntityActions.Load<FilterCategoriesQuery> {
  public static readonly type = `[Category] Load`;
}

export class LoadById {
  public static readonly type = `[Category] Load By Id`;

  constructor(public id: number) {}
}

export class LoadingFailed extends EntityActions.LoadingFailed {
  public static readonly type = `[Category API] Loading Failed`;
}

export class LoadingSucceeded extends EntityActions.LoadingSucceeded<
  Category,
  FilterCategoriesQuery
> {
  public static readonly type = `[Category API] Loading Succeeded`;
}

export class Create extends EntityActions.Create<EditCategoryDto> {
  public static readonly type = `[Category] Create`;
}

export class CreateFailed extends EntityActions.CreateFailed {
  public static readonly type = `[Category API] Create Failed`;
}

export class CreateSucceeded extends EntityActions.CreateSucceeded<Category> {
  public static readonly type = `[Category API] Create Succeeded`;
}

export class Update extends EntityActions.Update<EditCategoryDto> {
  public static readonly type = `[Category] Update`;
}

export class UpdateFailed extends EntityActions.UpdateFailed {
  public static readonly type = `[Category API] Update Failed`;
}

export class UpdateSucceeded extends EntityActions.UpdateSucceeded<Category> {
  public static readonly type = `[Category API] Update Succeeded`;
}

export class Delete extends EntityActions.Delete {
  public static readonly type = `[Category] Delete`;
}

export class DeleteFailed extends EntityActions.DeleteFailed {
  public static readonly type = `[Category API] Delete Failed`;
}

export class DeleteSucceeded extends EntityActions.DeleteSucceeded {
  public static readonly type = `[Category API] Delete Succeeded`;
}
export class SetCategoriesOfBuffet {
  public static readonly type = "[Category] Set Categories Of Buffet ";

  constructor(public buffetId: number, public categories: Category[]) {}
}

export class RemoveAllCategoriesOfBuffet {
  public static readonly type = "[Category] Remove All Categories Of Buffet ";

  constructor(public buffetId: number) {}
}
