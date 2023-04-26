import { Injectable } from "@angular/core";
import { Selector, State, StateContext, StateToken } from "@ngxs/store";
import { CreateOrderDto } from "@shared/order";

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
  @Selector()
  public static products(state: CartStateModel) {
    return state.data.products;
  }

  constructor() {}
}
