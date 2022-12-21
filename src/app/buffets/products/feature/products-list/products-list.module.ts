import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsListRoutingModule } from "./products-list-routing.module";
import { ProductsListPage } from "./products-list.page";
import { IonicModule } from "@ionic/angular";
import { ProductsListEffects, ProductsListState } from "./store";
import { NgxsEffectsModule } from "ngxs-effects";
import { NgxsModule } from "@ngxs/store";
import {
  ProductFilterComponent,
  ProductFilterMenuComponent,
  ProductPreviewComponent,
  ProductPreviewSkeletonComponent,
} from "../../ui";
import { IonicErrorCardComponent } from "@shared/exceptions";

@NgModule({
  declarations: [ProductsListPage],
  imports: [
    CommonModule,
    IonicModule,
    NgxsModule.forFeature([ProductsListState]),
    NgxsEffectsModule.forFeature(ProductsListEffects),
    ProductsListRoutingModule,
    ProductPreviewComponent,
    ProductPreviewSkeletonComponent,
    ProductFilterComponent,
    ProductFilterMenuComponent,
    IonicErrorCardComponent,
  ],
  providers: [],
})
export class ProductsListModule {}
