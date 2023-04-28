import { Category } from "@shared/category";

export class LoadMoreProducts {
  static readonly type = "[MainDesktop] Load More Products";
  constructor(public id: any) {}
}

export class LoadInitialProducts {
  static readonly type = "[MainDesktop] Load Initial Products";
  constructor(public id: any) {}
}

export class LoadPage {
  static readonly type = "[MainDesktop] Load Page";
}

export class Reset {
  static readonly type = "[MainDesktop] Reset";
}
