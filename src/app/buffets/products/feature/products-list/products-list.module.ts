import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsListRoutingModule } from "./products-list-routing.module";
import { ProductsListComponent } from "./products-list.component";
import { IonicModule, IonInfiniteScroll } from "@ionic/angular";
import { ProductPreviewComponent } from "../../ui/product-preview";

@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    CommonModule,
    IonicModule,
    ProductsListRoutingModule,
    ProductPreviewComponent,
  ],
})
export class ProductsListModule {}
