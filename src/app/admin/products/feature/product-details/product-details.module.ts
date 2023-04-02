import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductDetailsPage } from "./product-details.page";
import { NgxsFormPluginModule, ɵFormDirective } from "@ngxs/form-plugin";
import {
  ExtendedFormDirective,
  ExtendedFormPluginModule,
} from "@shared/extended-form-plugin";
import { ProductDetailsPageRoutingModule } from "./product-details-routing.module";
import { ProductEditorComponent } from "../product-editor";
import { ProductDetailsEffects, ProductDetailsState } from "./store";
import { NgxsModule } from "@ngxs/store";
import { ButtonGroupComponent } from "../../ui";
import {
  ErrorListComponent,
  SelectorInputComponent,
} from "@shared/inputs/ui/ionic";
import { ExceptionsModule } from "@shared/exceptions";
import { ErrorCardComponent } from "@shared/exceptions/ui/ionic";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxsFormPluginModule,
    NgxsModule.forFeature([ProductDetailsState]),
    ExceptionsModule.forFeature({
      ProductNotFoundException: "A termék nem található.",
      BuffetNotFoundException:
        "A büfé, amihe za termék tartozik nem található.",
    }),
    ExtendedFormPluginModule,
    ProductDetailsPageRoutingModule,
    SelectorInputComponent,
    ErrorListComponent,
    ProductEditorComponent,
    ButtonGroupComponent,
    ErrorCardComponent,
  ],
  providers: [ProductDetailsEffects],
  declarations: [ProductDetailsPage],
})
export class ProductDetailsPageModule {}
