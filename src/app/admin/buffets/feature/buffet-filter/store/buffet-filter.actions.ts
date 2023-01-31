export class FilterChanged {
  public static readonly type = "[BuffetFilter] Filter Changed";

//   public readonly filter: FilterProductsQuery;

//   constructor(filter: FilterProductsQuery) {
//     this.filter = FilterProductsQuery.createOrCopy(filter);
//   }
}

export class Typing {
  public static readonly type = "[BuffetFilter] Typing";
}

export class StoppedTyping {
  public static readonly type = "[BuffetFilter] Stopped Typing";
}