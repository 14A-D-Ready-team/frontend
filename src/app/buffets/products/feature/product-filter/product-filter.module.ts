import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NgxsModule } from "@ngxs/store";
import {
  SelectorInputComponent,
  NumericFilterInputComponent,
} from "@shared/inputs/feature/ionic";
import { ProductFilterComponent } from "./product-filter.component";
import { ProductFilterEffects, ProductFilterState } from "./store";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";

@NgModule({
  declarations: [ProductFilterComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    SelectorInputComponent,
    NumericFilterInputComponent,
    NgxsModule.forFeature([ProductFilterState]),
    NgxsFormPluginModule,
  ],
  providers: [ProductFilterEffects],
  exports: [ProductFilterComponent],
})
export class ProductFilterModule {}
