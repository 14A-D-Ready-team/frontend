import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductRoutingModule } from "./product-routing.module";
import { FormsModule } from "@angular/forms";
import { NavbarModule } from "../navbar";
import { IonicModule } from "@ionic/angular";
import { ProductComponent } from "./product.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ProductRoutingModule,
    NavbarModule,
    //NgxsModule.forFeature([ProductState]),
  ],
  declarations: [ProductComponent],
})
export class ProductModule {}
