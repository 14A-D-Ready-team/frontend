import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BuffetListRoutingModule } from "./buffet-list-routing.module";
import { BuffetListPage } from "./buffet-list.page";
import { BuffetsListState } from "./store/buffet-list.state";

import {
  BuffetPreviewComponent,
  BuffetPreviewSkeletonComponent,
  TypingOverlayComponent,
} from "../../ui";
import { IonicModule } from "@ionic/angular";
import { NglrxPipesModule } from "@nglrx/pipes";
import { NgxsModule } from "@ngxs/store";
import { ErrorCardComponent } from "@shared/exceptions/ui/ionic";
import { BuffetFilterModule } from "../buffet-filter/buffet-filter.module";
import { BuffetsListEffects } from "./store";
import { BuffetFilterState } from "../buffet-filter/store";
import { AdminHeaderComponent } from "@app/admin/shell";

@NgModule({
  declarations: [BuffetListPage],
  imports: [
    CommonModule,
    IonicModule,
    NglrxPipesModule,
    NgxsModule.forFeature([BuffetsListState, BuffetFilterState]),
    BuffetListRoutingModule,
    BuffetFilterModule,
    BuffetPreviewComponent,
    BuffetPreviewSkeletonComponent,
    ErrorCardComponent,
    TypingOverlayComponent,
    AdminHeaderComponent,
  ],
  providers: [BuffetsListEffects],
})
export class BuffetListModule {}
