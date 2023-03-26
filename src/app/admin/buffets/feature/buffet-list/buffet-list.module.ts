import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BuffetListRoutingModule } from "./buffet-list-routing.module";
import { BuffetListPage } from "./buffet-list.page";
import { BuffetListState } from "./store/buffet-list.state";

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
import { BuffetListEffects } from "./store";
import { BuffetFilterState } from "../buffet-filter/store";
import { AdminHeaderComponent } from "@app/admin/shell";
import { MenuWrapperComponent } from "@shared/menu";

@NgModule({
  declarations: [BuffetListPage],
  imports: [
    CommonModule,
    IonicModule,
    NglrxPipesModule,
    NgxsModule.forFeature([BuffetListState, BuffetFilterState]),
    BuffetListRoutingModule,
    BuffetFilterModule,
    BuffetPreviewComponent,
    BuffetPreviewSkeletonComponent,
    ErrorCardComponent,
    TypingOverlayComponent,
    AdminHeaderComponent,
    MenuWrapperComponent,
  ],
  providers: [BuffetListEffects],
})
export class BuffetListModule {}
