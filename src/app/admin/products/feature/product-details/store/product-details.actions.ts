import { Product } from "@shared/product";

export class Save {
  public static readonly type = "[Product Details Page] Save";
}

export class LoadPage {
  public static readonly type = "[Product Details Page] LoadPage";

  public constructor(public readonly targetId: number) {}
}

export class SetError {
  public static readonly type = "[Product Details Page] SetError";

  public constructor(public readonly error?: any) {}
}

export class SetUpdatedProductData {
  public static readonly type =
    "[Product Details Page] Set Updated Product Data";

  constructor(public product: Product) {}
}

export class Reset {
  static readonly type = "[ProductDetails] Reset";
}

export class DiscardChanges {
  static readonly type = "[ProductDetails] Discard Changes";
}
