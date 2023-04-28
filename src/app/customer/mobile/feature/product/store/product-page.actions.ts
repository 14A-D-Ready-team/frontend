import { Category } from "@shared/category";

export class AddProduct {
  static readonly type = "[ProductPage] Add Product";
}

export class Reset {
  static readonly type = "[ProductPage] Reset";
}

export class LoadPage {
  static readonly type = "[ProductPage] Load Page";
}

export class CategoriesLoaded {
  static readonly type = "[ProductPage] Categories Loaded";
  constructor(public categories: Category[]) {}
}
