import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { Selector, State, StateContext, StateToken } from "@ngxs/store";
import { CreateOrderDto, OrderedProductDto } from "@shared/order";
import { Option, Product, ProductState } from "@shared/product";
import { flatten, join, sumBy } from "lodash";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CartStateModel {
  data: CreateOrderDto;
}

export type MergedProduct = Product &
  OrderedProductDto & { selectedOptionNames: string; calculatedPrice: number };

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
    return state.data.products.map(op => {
      const product = productDict[op.productId];
      const options = flatten(product.customizations.map(c => c.options));
      const selectedOptions = op.selectedOptionIds.map(id =>
        options.find(o => o.id === id),
      );

      return {
        ...op,
        ...product,
        selectedOptionNames: join(
          selectedOptions.map(o => o?.name),
          ", ",
        ),
        calculatedPrice:
          ((product.discountedPrice || product.fullPrice) +
            sumBy(selectedOptions, o => o?.extraCost || 0)) *
          op.amount,
      } as MergedProduct;
    });
  }

  @Selector([CartState.products])
  public static totalPrice(state: CartStateModel, products: MergedProduct[]) {
    return sumBy(products, p => p.calculatedPrice);
  }

  constructor() {}
}
