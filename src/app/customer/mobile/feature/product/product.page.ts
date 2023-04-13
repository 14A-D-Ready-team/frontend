import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, CategoryState } from "@shared/category";
import { Customization, Product, ProductState } from "@shared/product";
import { Observable, take } from "rxjs";

@Component({
  selector: "app-product",
  templateUrl: "./product.page.html",
  styleUrls: ["./product.page.scss"],
})
export class ProductPage implements OnInit {
  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  @Select(ProductState.entities)
  public products$!: Observable<Product[]>;

  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

  constructor(private route: ActivatedRoute) {}

  activeProduct!: Product;

  activeCategory!: Category;

  customizations!: Customization[];

  amount = 1;
  max = 1;

  idFromRoute!: string;

  changeAmount(add: boolean) {
    if (add) {
      if (this.amount < this.max) this.amount++;
    } else {
      if (this.amount > 1) this.amount--;
    }
  }

  ngOnInit() {
    this.idFromRoute = this.route.snapshot.queryParamMap.get("productId")!;

    this.products$.pipe(take(1)).subscribe(products =>
      products.forEach(product => {
        if (this.idFromRoute === product.id.toString()) {
          this.activeProduct = product;
        }
      }),
    );

    this.max = this.activeProduct.stock;

    this.categories$.pipe(take(1)).subscribe(categories =>
      categories.forEach(category => {
        if (this.activeProduct.categoryId === category.id) {
          this.activeCategory = category;
        }
      }),
    );

    this.customizations = this.activeProduct.customizations;
  }
}
