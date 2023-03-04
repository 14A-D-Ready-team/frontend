export class LoadPage {
  public static readonly type = "[BuffetListPage] Load Page";
}

export class LoadMore {
  public static readonly type = "[BuffetListPage] Load More";
}

export class Reload {
  public static readonly type = "[BuffetListPage] Reload";
}

export class RetryLoading {
  public static readonly type = "[BuffetListPage] Retry Loading";
}

export class Delete {
  public static readonly type = "[BuffetListPage] Delete";

  public id: string;

  constructor(inputId: string) {
    this.id = inputId;
  }
}
