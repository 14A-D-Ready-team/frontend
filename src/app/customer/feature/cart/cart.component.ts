import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import {
  CartState,
  ChangeAmount,
  DeleteProduct,
  MergedProduct,
  OrderProducts,
} from "@shared/cart/data-access";
import { OrderedProductDto } from "@shared/order";
import { Product } from "@shared/product";
import { Observable } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CartComponent implements OnInit {
  @Select(CartState.products)
  public products$!: Observable<MergedProduct[]>;

  constructor(private store: Store) {}

  changeAmount(index: number, value: number) {
    this.store.dispatch(new ChangeAmount(index, value));
  }

  deleteProduct(index: number) {
    this.store.dispatch(new DeleteProduct(index));
  }

  order() {
    this.store.dispatch(new OrderProducts());
  }

  ngOnInit() {}
}
