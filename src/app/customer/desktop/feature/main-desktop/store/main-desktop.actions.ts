export class LoadMoreProducts {
  static readonly type = "[MainDesktop] Load More Products";
  constructor(public id: any) {}
}

export class LoadInitialProducts {
  static readonly type = "[MainDesktop] Load Initial Products";
  constructor(public id: any) {}
}
