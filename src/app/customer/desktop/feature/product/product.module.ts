import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductRoutingModule } from "./product-routing.module";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NavbarModule } from "../navbar";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    IonicModule,
    NavbarModule,
    //NgxsModule.forFeature([ProductState]),
  ],
})
export class ProductModule {}
