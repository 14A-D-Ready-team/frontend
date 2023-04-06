import { Category } from "@shared/category";

export class LoadPage {
  public static readonly type = "[CategoryListPage] Load Page";
}
export class AddNew {
  public static readonly type = "[CategoryListPage] Add New";
}

export class SaveNew {
  public static readonly type = "[CategoryListPage] Save New";
}

export class StopAddingNew {
  public static readonly type = "[CategoryListPage] Stop Adding New";
}

export class Edit {
  public static readonly type = "[CategoryListPage] Edit";

  constructor(public category: Category) {}
}

export class SaveEdit {
  public static readonly type = "[CategoryListPage] Save Edit";
}

export class StopEdit {
  public static readonly type = "[CategoryListPage] Stop Edit";
}

export class Reload {
  public static readonly type = "[CategoryListPage] Reload";
}
