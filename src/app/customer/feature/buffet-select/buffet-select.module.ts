import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuffetSelectPageRoutingModule } from "./buffet-select-routing.module";

import { BuffetSelectPage } from "./buffet-select.page";
import { NgxsModule } from "@ngxs/store";
import { BuffetSelectState } from "@shared/inputs/feature/ionic/buffet-select/store";
import { BuffetSelectComponent } from "@shared/inputs/feature/ionic";
// import { BuffetSelectState } from "./store";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuffetSelectPageRoutingModule,
    BuffetSelectComponent,
    NgxsModule.forFeature([BuffetSelectState]),
  ],
  declarations: [BuffetSelectPage],
})
export class BuffetSelectPageModule {}
