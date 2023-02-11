import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TestPageRoutingModule } from "./test-routing.module";

import { TestPage } from "./test.page";
import { AdminHeaderComponent } from "../shell";
import { ImageSelectorComponent } from "@shared/inputs/feature/ionic";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    AdminHeaderComponent,
    ImageSelectorComponent,
    ReactiveFormsModule,
  ],
  declarations: [TestPage],
})
export class TestPageModule {}
