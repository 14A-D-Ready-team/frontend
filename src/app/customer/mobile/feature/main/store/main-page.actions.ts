import { Category } from "@shared/category";

export class SelectCategory {
  static readonly type = "[MainPage] Select Category";
  constructor(public id: any) {}
}

export class LoadMoreProducts {
  static readonly type = "[MainPage] Load More Products";
  constructor(public id: any) {}
}

export class Reset {
  static readonly type = "[MainPage] Reset";
}

export class LoadPage {
  static readonly type = "[MainPage] Load Page";
}

export class CategoriesLoaded {
  static readonly type = "[MainPage] Categories Loaded";
  constructor(public categories: Category[]) {}
}
