import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuffetSelectPageRoutingModule } from "./buffet-select-routing.module";

import { BuffetSelectPage } from "./buffet-select.page";
import { BuffetSelectComponent } from "@shared/inputs/feature/ionic";
import { NavbarComponent, NavbarModule } from "../navbar";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuffetSelectPageRoutingModule,
    NavbarModule,
    BuffetSelectComponent,
  ],
  declarations: [BuffetSelectPage],
})
export class BuffetSelectPageModule {}
