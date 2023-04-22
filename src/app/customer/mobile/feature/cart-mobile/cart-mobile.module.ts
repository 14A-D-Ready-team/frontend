import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartMobilePageRoutingModule } from './cart-mobile-routing.module';

import { CartMobilePage } from './cart-mobile.page';
import { CartComponent } from '@app/customer/feature/cart';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartMobilePageRoutingModule,
    CartComponent
  ],
  declarations: [CartMobilePage]
})
export class CartMobilePageModule {}
