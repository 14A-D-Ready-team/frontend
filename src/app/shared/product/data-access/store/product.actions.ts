export class LoadPaginated {
  public static type = "[Product] Load Paginated";

  constructor(public skip: number, public take: number) {}
}

export class LoadingPaginatedSucceeded {
  public static type = "[Product API] Loading Paginated Succeeded";
}

export class LoadingPaginatedFailed {
  public static type = "[Product API] Loading Paginated Failed";
}
