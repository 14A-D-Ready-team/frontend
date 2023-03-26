import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductListRoutingModule } from "./product-list-routing.module";
import { ProductListPage } from "./product-list.page";
import { IonicModule } from "@ionic/angular";
import { ProductListEffects, ProductListState } from "./store";
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
import { MenuWrapperComponent } from "@shared/menu";

@NgModule({
  declarations: [ProductListPage],
  imports: [
    CommonModule,
    IonicModule,
    NglrxPipesModule,
    NgxsModule.forFeature([ProductListState, ProductFilterState]),
    ProductListRoutingModule,
    ProductFilterModule,
    ProductPreviewComponent,
    ProductPreviewSkeletonComponent,
    ErrorCardComponent,
    TypingOverlayComponent,
    AdminHeaderComponent,
    MenuWrapperComponent,
  ],
  providers: [ProductListEffects],
})
export class ProductListModule {}
