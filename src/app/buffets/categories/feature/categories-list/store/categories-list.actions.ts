export class Reset {
  public static readonly type = "[CategoriesListPage] Reset";
}

export class StartEditing {
  public static readonly type = "[CategoriesListPage] StartEditing";

  constructor(public id: number) {}
}

export class StopEditing {
  public static readonly type = "[CategoriesListPage] StopEditing";

  constructor(public save: boolean) {}
}
