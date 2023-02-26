import { SearchBuffetsQuery } from "@shared/buffet/data-access/query";

export class FilterChanged {
  public static readonly type = "[BuffetFilter] Filter Changed";

  public readonly filter: SearchBuffetsQuery;

  constructor(filter: SearchBuffetsQuery) {
    this.filter = SearchBuffetsQuery.clone(filter);
  }
}

export class Typing {
  public static readonly type = "[BuffetFilter] Typing";
}

export class StoppedTyping {
  public static readonly type = "[BuffetFilter] Stopped Typing";
}