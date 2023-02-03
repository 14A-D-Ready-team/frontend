abstract class LoadAll {
  public static readonly type = "[Category] Load All";

  constructor(/* public buffetId:number */) {}
}

abstract class LoadingFailed {
  public static readonly type = "[Category API] Loading Failed";

  constructor(public error: any) {}
}

abstract class LoadingSucceeded {
  public static readonly type = "[Category API] Loading Succeeded";

  constructor(public entities: Category[]) {}
}

abstract class SetAllLoaded {
  public static readonly type = "[Category] Set All Loaded";

  constructor(public isAllLoaded: boolean) {}
}

abstract class Create {
  public static readonly type = "[Category] Create";

  constructor(public payload: EditCategoryDto) {}
}

export abstract class CreateFailed {
  public static readonly type = "[Category API] Create Failed";

  constructor(public error: any) {}
}

abstract class CreateSucceeded {
  public static readonly type = "[Category API] Create Succeeded";

  constructor(public category: Category) {}
}

export abstract class Update {
  public static readonly type = "[Category] Update";

  constructor(public payload: EditCategoryDto) {}
}

export abstract class UpdateFailed {
  public static readonly type = "[Category API] Update Failed";

  constructor(public error: any) {}
}

export abstract class UpdateSucceeded {
  public static readonly type = "[Category API] Update Succeeded";

  constructor(public category: Category) {}
}

export abstract class Delete {
  public static readonly type = "[Category] Delete";

  constructor(public id: number) {}
}

export abstract class DeleteFailed {
  public static readonly type = "[Category API] Delete Failed";

  constructor(public error: any) {}
}

export abstract class DeleteSucceeded {
  public static readonly type = "[Category API] Delete Succeeded";

  constructor(public id: number) {}
}
