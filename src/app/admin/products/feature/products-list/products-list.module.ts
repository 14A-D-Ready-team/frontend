import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsListRoutingModule } from "./products-list-routing.module";
import { ProductsListPage } from "./products-list.page";
import { IonicModule } from "@ionic/angular";
import { ProductsListEffects, ProductsListState } from "./store";
import { NgxsModule } from "@ngxs/store";
import {
  ProductPreviewComponent,
  ProductPreviewSkeletonComponent,
  TypingOverlayComponent,
} from "../../ui";
import { NglrxPipesModule } from "@nglrx/pipes";
import { ErrorCardComponent } from "@shared/exceptions/ui/ionic";
import { ProductFilterModule } from "../product-filter";
import { ProductFilterState } from "../product-filter";
import { AdminHeaderComponent } from "@app/admin/shell";

@NgModule({
  declarations: [ProductsListPage],
  imports: [
    CommonModule,
    IonicModule,
    NglrxPipesModule,
    NgxsModule.forFeature([ProductsListState, ProductFilterState]),
    ProductsListRoutingModule,
    ProductFilterModule,
    ProductPreviewComponent,
    ProductPreviewSkeletonComponent,
    ErrorCardComponent,
    TypingOverlayComponent,
    AdminHeaderComponent,
  ],
  providers: [ProductsListEffects],
})
export class ProductsListModule {}
