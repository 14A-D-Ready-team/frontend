import { FilterProductsQuery } from "@shared/product";

export class FilterChanged {
  public static readonly type = "[ProductFilter] Filter Changed";

  public readonly filter: FilterProductsQuery;

  constructor(filter: FilterProductsQuery) {
    this.filter = FilterProductsQuery.createOrCopy(filter);
  }
}

export class Typing {
  public static readonly type = "[ProductFilter] Typing";
}

export class StoppedTyping {
  public static readonly type = "[ProductFilter] Stopped Typing";
}
