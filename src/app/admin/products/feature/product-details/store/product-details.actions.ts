import { Product } from "@shared/product";

export class Save {
  public static readonly type = "[Product Details Page] Save";
}

export class LoadPage {
  public static readonly type = "[Product Details Page] LoadPage";
}

export class SetUpdatedProductData {
  public static readonly type =
    "[Product Details Page] Set Updated Product Data";

  constructor(public product: Product) {}
}
