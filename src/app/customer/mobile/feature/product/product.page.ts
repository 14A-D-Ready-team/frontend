import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, CategoryState } from "@shared/category";
import { Customization, Option, Product, ProductState } from "@shared/product";
import { NumericDictionary } from "lodash";
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

  finalPrice!: number;

  idFromRoute!: string;

  userCustomization: any[] = [];

  changeAmount(add: boolean) {
    if (add) {
      if (this.amount < this.max) this.amount++;
    } else {
      if (this.amount > 1) this.amount--;
    }

    this.finalPrice = this.activeProduct.fullPrice * this.amount;
  }

  asd(option: Option) {
    this.userCustomization.push(option);
    console.log(this.userCustomization);
  }

  onCustomCheck(event: any, customization: Option) {
    if (event.detail.checked) {
      this.userCustomization.push(customization);
      console.log(this.userCustomization);
    } else {
      const index = this.userCustomization.indexOf(customization);
      this.userCustomization.splice(index, 1);
      console.log(this.userCustomization);
    }
  }

  ngOnInit() {
    this.idFromRoute = this.route.snapshot.queryParamMap.get("productId")!;

    if (this.idFromRoute) {
      this.products$.pipe(take(1)).subscribe(products =>
        products.forEach(product => {
          if (this.idFromRoute === product.id.toString()) {
            this.activeProduct = product;
            this.max = this.activeProduct.stock;
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
