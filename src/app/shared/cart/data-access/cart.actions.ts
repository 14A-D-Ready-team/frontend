export class OrderProducts {
  static readonly type = "[Cart] Order Products";
}

export class DeleteProduct {
  static readonly type = "[Cart] Delete Product";
  constructor(public index: number) {}
}

export class ChangeAmount {
  static readonly type = "[Cart] Change Amount";
  constructor(public index: number, public value: number) {}
}
