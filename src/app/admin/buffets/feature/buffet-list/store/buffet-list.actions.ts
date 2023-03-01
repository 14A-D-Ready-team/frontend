export class LoadPage {
  public static readonly type = "[BuffetsListPage] Load Page";
}

export class LoadMore {
  public static readonly type = "[BuffetsListPage] Load More";
}

export class Reload {
  public static readonly type = "[BuffetsListPage] Reload";
}

export class RetryLoading {
  public static readonly type = "[BuffetsListPage] Retry Loading";
}

export class Delete {
  public static readonly type = "[BuffetsListPage] Delete";

  public id: string

  constructor(inputId: string) {
    this.id = inputId;
  }
}
