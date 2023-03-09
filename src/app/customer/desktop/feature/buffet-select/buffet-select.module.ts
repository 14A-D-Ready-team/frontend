import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuffetSelectPageRoutingModule } from "./buffet-select-routing.module";

import { BuffetSelectPage } from "./buffet-select.page";
import { NavbarModule } from "../navbar";
import { NgxsModule } from "@ngxs/store";
import {
  BuffetSelectComponent,
  BuffetSelectState,
} from "@app/customer/feature";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuffetSelectPageRoutingModule,
    NavbarModule,
    BuffetSelectComponent,
    NgxsModule.forFeature([BuffetSelectState]),
  ],
  declarations: [BuffetSelectPage],
})
export class BuffetSelectPageModule {}
