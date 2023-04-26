import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Store } from "@ngxs/store";
import {
  ChangeAmount,
  DeleteProduct,
  OrderProducts,
} from "@shared/cart/data-access";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CartComponent implements OnInit {
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
