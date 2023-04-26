import { environment } from "@/environments/environment";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { BuffetState, Buffet } from "@shared/buffet";
import { CategoryState, Category } from "@shared/category";
import { Customization, Option, Product, ProductState } from "@shared/product";
import { Observable, take } from "rxjs";

@Component({
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
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

  finalPrice!: number;

  userCustomization: Option[] = [];

  customs: Customization[] = [];

  changeAmount(add: boolean) {
    if (add) {
      if (this.amount < this.max) this.amount++;
    } else {
      if (this.amount > 1) this.amount--;
    }

    this.finalPrice = this.activeProduct.fullPrice * this.amount;
  }

  getImage(productId: number) {
    return environment.api.url + "/product/" + productId + "/image";
  }

  ngOnInit() {
    const idFromRoute = this.route.snapshot.queryParamMap.get("productId")!;

    if (idFromRoute) {
      this.products$.pipe(take(1)).subscribe(products =>
        products.forEach(product => {
          if (idFromRoute === product.id.toString()) {
            this.activeProduct = product;
            if (this.activeProduct.stock > 3) {
              this.max = 3;
            } else {
              this.max = this.activeProduct.stock;
            }
            this.finalPrice = this.activeProduct.fullPrice;
          }
        }),
      );

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
}
