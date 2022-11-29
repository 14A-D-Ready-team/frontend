import { Category } from "@shared/category";

export class LoadPage {
  public static readonly type = "[CategoriesListPage] Load Page";
}

export class Edit {
  public static readonly type = "[CategoriesListPage] Edit";

  constructor(public category: Category) {}
}

export class SaveEdit {
  public static readonly type = "[CategoriesListPage] Save Edit";
}

export class StopEdit {
  public static readonly type = "[CategoriesListPage] Stop Edit";
}

export class Delete {
  public static readonly type = "[CategoriesListPage] Delete";

  constructor(public id: number) {}
}

export class Reload {
  public static readonly type = "[CategoriesListPage] Reload";
}

export class Reset {
  public static readonly type = "[CategoriesListPage] Reset";
}
