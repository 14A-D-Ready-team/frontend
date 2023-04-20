import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, CategoryState } from "@shared/category";
import { Customization, Option, Product, ProductState } from "@shared/product";
import { Observable, take } from "rxjs";
import { CLIENT_RENEG_LIMIT } from "tls";

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


  userCustomization: Option[] = [];

  customs :Customization[] = [];

  changeAmount(add: boolean) {
    if (add) {
      if (this.amount < this.max) this.amount++;
    } else {
      if (this.amount > 1) this.amount--;
    }

    this.finalPrice = this.activeProduct.fullPrice * this.amount;
  }

  onCustomCheck(event: any, customization: Option, c: Customization) {
    if (event.detail.checked) {
      this.userCustomization.push(customization);
      this.customs.push(c);
      console.log();
    } else {
      const index = this.userCustomization.indexOf(customization);
      this.userCustomization.splice(index, 1);
    }
  }

  onCustomRadio(event: any){
    console.log(event.detail.value)
  }

  onSpecRadio(customization: Customization,option: Option){

    const index = this.userCustomization.indexOf(option);
    this.userCustomization.splice(index, 1);
    console.log(this.customs);

  }



  ngOnInit() {
    const idFromRoute = this.route.snapshot.queryParamMap.get("productId")!;

    if (idFromRoute) {
      this.products$.pipe(take(1)).subscribe(products =>
        products.forEach(product => {
          if (idFromRoute === product.id.toString()) {
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
