import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductDetailsPage } from "./product-details.page";
import {
  ErrorListComponent,
  SelectorInputComponent,
} from "@shared/inputs/feature/ionic";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ExtendedFormPluginModule } from "@shared/extended-form-plugin";
import { ProductDetailsPageRoutingModule } from "./product-details-routing.module";
import { ProductEditorComponent } from "../product-editor";
import { ProductDetailsEffects, ProductDetailsState } from "./store";
import { NgxsModule } from "@ngxs/store";
import { ButtonGroupComponent } from "../../ui";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxsFormPluginModule,
    NgxsModule.forFeature([ProductDetailsState]),
    ExtendedFormPluginModule,
    ProductDetailsPageRoutingModule,
    SelectorInputComponent,
    ErrorListComponent,
    ProductEditorComponent,
    ButtonGroupComponent,
  ],
  providers: [ProductDetailsEffects],
  declarations: [ProductDetailsPage],
})
export class ProductDetailsPageModule {}
