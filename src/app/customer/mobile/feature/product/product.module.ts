import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductPageRoutingModule } from "./product-routing.module";

import { ProductPage } from "./product.page";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "@app/app-routing.module";
import { ErrorMessagePipe } from "@shared/exceptions";
import { NgxsModule } from "@ngxs/store";
import { ProductPageState } from "./store";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorMessagePipe,
    NgxsModule.forFeature([ProductPageState]),
  ],
  declarations: [ProductPage],
})
export class ProductPageModule {}
