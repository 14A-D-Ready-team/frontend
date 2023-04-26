import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { Selector, State, StateContext, StateToken } from "@ngxs/store";
import { CreateOrderDto, OrderedProductDto } from "@shared/order";
import { Product, ProductState } from "@shared/product";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CartStateModel {
  data: CreateOrderDto;
}

export const CART_STATE_TOKEN = new StateToken<CartStateModel>("cart");

@State<CartStateModel>({
  name: CART_STATE_TOKEN,
  defaults: {
    data: {
      products: [],
    },
  },
})
@Injectable()
export class CartState {
  @Selector([ProductState.entitiesMap])
  public static products(
    state: CartStateModel,
    productDict: Dictionary<Product>,
  ) {
    return state.data.products.map(
      op =>
        ({ ...op, ...productDict[op.productId] } as Product &
          OrderedProductDto),
    );
  }

  constructor() {}
}
