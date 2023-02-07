import { EditCategoryDto } from "../dto";
import { Category } from "../entity";
import { FilterCategoriesQuery } from "../query";

export class Load {
  public static readonly type = "[Category] Load ";

  // TODO: We'll load the categories of a buffet
  constructor(public query: FilterCategoriesQuery) {}
}

export class LoadingFailed {
  public static readonly type = "[Category API] Loading Failed";

  constructor(public error: any) {}
}

export class LoadingSucceeded {
  public static readonly type = "[Category API] Loading Succeeded";

  constructor(public categories: Category[]) {}
}

export class SetAllLoaded {
  public static readonly type = "[Category] Set All Loaded";

  constructor(public isAllLoaded: boolean) {}
}

export class Create {
  public static readonly type = "[Category] Create";

  constructor(public payload: EditCategoryDto) {}
}

export class CreateFailed {
  public static readonly type = "[Category API] Create Failed";

  constructor(public error: any) {}
}

export class CreateSucceeded {
  public static readonly type = "[Category API] Create Succeeded";

  constructor(public category: Category) {}
}

export class Update {
  public static readonly type = "[Category] Update";

  constructor(public payload: EditCategoryDto) {}
}

export class UpdateFailed {
  public static readonly type = "[Category API] Update Failed";

  constructor(public error: any) {}
}

export class UpdateSucceeded {
  public static readonly type = "[Category API] Update Succeeded";

  constructor(public category: Category) {}
}

export class Delete {
  public static readonly type = "[Category] Delete";

  constructor(public id: number) {}
}

export class DeleteFailed {
  public static readonly type = "[Category API] Delete Failed";

  constructor(public error: any) {}
}

export class DeleteSucceeded {
  public static readonly type = "[Category API] Delete Succeeded";

  constructor(public id: number) {}
}
