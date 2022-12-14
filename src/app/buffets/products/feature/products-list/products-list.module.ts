import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsListRoutingModule } from "./products-list-routing.module";
import { ProductsListPage } from "./products-list.page";
import { IonicModule, IonInfiniteScroll } from "@ionic/angular";
import { ProductPreviewComponent } from "../../ui/product-preview";

@NgModule({
  declarations: [ProductsListPage],
  imports: [
    CommonModule,
    IonicModule,
    ProductsListRoutingModule,
    ProductPreviewComponent,
  ],
})
export class ProductsListModule {}
