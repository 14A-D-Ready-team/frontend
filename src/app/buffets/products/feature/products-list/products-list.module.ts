import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsListRoutingModule } from "./products-list-routing.module";
import { ProductsListPage } from "./products-list.page";
import { IonicModule } from "@ionic/angular";
import { ProductsListEffects, ProductsListState } from "./store";
import { NgxsEffectsModule } from "ngxs-effects";
import { NgxsModule } from "@ngxs/store";
import {
  ProductPreviewComponent,
  ProductPreviewSkeletonComponent,
} from "../../ui";
import { NglrxPipesModule } from "@nglrx/pipes";
import { ErrorCardComponent } from "@shared/exceptions/ui/ionic";
import { ProductFilterModule } from "../product-filter";
import { ProductFilterState } from "../product-filter";

@NgModule({
  declarations: [ProductsListPage],
  imports: [
    CommonModule,
    IonicModule,
    NglrxPipesModule,
    NgxsModule.forFeature([ProductsListState, ProductFilterState]),
    NgxsEffectsModule.forFeature(ProductsListEffects),
    ProductsListRoutingModule,
    ProductFilterModule,
    ProductPreviewComponent,
    ProductPreviewSkeletonComponent,
    ErrorCardComponent,
  ],
  providers: [],
})
export class ProductsListModule {}
