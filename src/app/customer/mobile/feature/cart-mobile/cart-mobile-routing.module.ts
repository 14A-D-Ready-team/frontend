import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartMobilePage } from './cart-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: CartMobilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartMobilePageRoutingModule {}
