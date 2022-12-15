import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsListRoutingModule } from "./products-list-routing.module";
import { ProductsListPage } from "./products-list.page";
import { IonicModule, IonInfiniteScroll } from "@ionic/angular";
import { ProductPreviewComponent } from "../../ui/product-preview";
import { ProductsListEffects } from "./store";
import { NgxsEffectsModule } from "ngxs-effects";

@NgModule({
  declarations: [ProductsListPage],
  imports: [
    CommonModule,
    IonicModule,
    ProductsListRoutingModule,
    ProductPreviewComponent,
    NgxsEffectsModule.forFeature(ProductsListEffects),
  ],
  providers: [],
})
export class ProductsListModule {}
