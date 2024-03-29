import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BuffetFilterComponent } from "./buffet-filter.component";
import { BuffetFilterEffects, BuffetFilterState } from "./store";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { NgxsModule } from "@ngxs/store";
import { ExtendedFormPluginModule } from "@shared/extended-form-plugin";
import { StringFilterInputComponent } from "@shared/inputs/ui/ionic/string-filter-input/string-filter-input.component";
import { OrderItemsInputComponent } from "@shared/inputs/ui/ionic/order-items-input/order-items-input.component";
import { SelectorInputComponent } from "@shared/inputs/ui/ionic";

@NgModule({
  declarations: [BuffetFilterComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SelectorInputComponent,
    StringFilterInputComponent,
    OrderItemsInputComponent,
    NgxsModule.forFeature([BuffetFilterState]),
    NgxsFormPluginModule,
    ExtendedFormPluginModule,
  ],
  providers: [BuffetFilterEffects],
  exports: [BuffetFilterComponent],
})
export class BuffetFilterModule {}
