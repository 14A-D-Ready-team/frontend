import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductEditorPageRoutingModule } from "./product-editor-routing.module";

import { ProductEditorPage } from "./product-editor.page";
import {
  ErrorListComponent,
  SelectorInputComponent,
} from "@shared/inputs/feature/ionic";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ExtendedFormPluginModule } from "@shared/extended-form-plugin";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxsFormPluginModule,
    ExtendedFormPluginModule,
    ProductEditorPageRoutingModule,
    SelectorInputComponent,
    ErrorListComponent,
  ],
  declarations: [ProductEditorPage],
})
export class ProductEditorPageModule {}
