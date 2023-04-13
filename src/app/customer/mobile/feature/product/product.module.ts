import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductPageRoutingModule } from "./product-routing.module";

import { ProductPage } from "./product.page";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "@app/app-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    RouterModule,
  ],
  declarations: [ProductPage],
})
export class ProductPageModule {}
