import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, CategoryState } from "@shared/category";
import { Product, ProductState, loadProductById } from "@shared/product";
import { Observable, switchMap } from "rxjs";

@Component({
  selector: "app-product",
  templateUrl: "./product.page.html",
  styleUrls: ["./product.page.scss"],
})
export class ProductPage implements OnInit {
  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.loadResult$ = loadProductById(route, store);

    this.product$ = route.queryParams.pipe(
      switchMap(params => {
        return store.select(ProductState.entityById(params.productId));
      }),
    );
  }

  public loadResult$: Observable<{ loading: boolean; error?: any }>;

  public product$: Observable<Product | undefined>;

  amount = 1;
  max = 1;

  finalPrice!: number;

  changeAmount(add: boolean) {
    if (add) {
      if (this.amount < this.max) this.amount++;
    } else {
      if (this.amount > 1) this.amount--;
    }

    // this.finalPrice = .fullPrice * this.amount;
  }

  ngOnInit() {}
}
