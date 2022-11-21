import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsListRoutingModule } from "./products-list-routing.module";
import { ProductsListComponent } from "./products-list.component";
import { IonicModule, IonInfiniteScroll } from "@ionic/angular";

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule, IonicModule, ProductsListRoutingModule],
})
export class ProductsListModule {}
