import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product",
  templateUrl: "./product.page.html",
  styleUrls: ["./product.page.scss"],
})
export class ProductPage implements OnInit {
  constructor() {}

  data = {
    id: 1,
    name: "Coca Cola",
    description:
      "Ab porro beatae dolores velit ex harum esse. Reprehenderit debitis totam ipsa iste. Unde inventore quam. Debitis itaque quaerat. Occaecati ducimus voluptatum impedit minima. Ut ducimus labore dolor nulla inventore.",
    fullPrice: "95",
    discountedPrice: "3820",
    stock: 26,
    categoryId: 1,
    customizations: [
      {
        id: 1,
        description: "Méret",
        optionCount: 0,
        options: [
          {
            id: 1,
            name: "0,33l",
            extraCost: "0",
          },
          {
            id: 2,
            name: "0,5l",
            extraCost: "25",
          },
          {
            id: 3,
            name: "1,25l",
            extraCost: "75",
          },
          {
            id: 4,
            name: "1,75l",
            extraCost: "270",
          },
          {
            id: 5,
            name: "2,25l",
            extraCost: "415",
          },
        ],
      },
    ],
  };

  amount = 1;
  max = 1;

  changeAmount(add: boolean) {
    if (add) {
      if (this.amount < this.max) this.amount++;
    } else {
      if (this.amount > 1) this.amount--;
    }
  }

  ngOnInit() {
    this.max = this.data.stock;
  }
}
