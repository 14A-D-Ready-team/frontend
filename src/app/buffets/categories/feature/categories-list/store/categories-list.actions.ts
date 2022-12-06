import { Category } from "@shared/category";

export class LoadPage {
  public static readonly type = "[CategoriesListPage] Load Page";
}
export class AddNew {
  public static readonly type = "[CategoriesListPage] Add New";
}

export class SaveNew {
  public static readonly type = "[CategoriesListPage] Save New";
}

export class StopAddingNew {
  public static readonly type = "[CategoriesListPage] Stop Adding New";
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

export class ConfirmDelete {
  public static readonly type = "[CategoriesListPage] Confirm Delete";

  constructor() {}
}

export class CancelDelete {
  public static readonly type = "[CategoriesListPage] Cancel Delete";
}

export class Reload {
  public static readonly type = "[CategoriesListPage] Reload";
}

export class Reset {
  public static readonly type = "[CategoriesListPage] Reset";
}
