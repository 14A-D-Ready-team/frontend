import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuffetSelectPage } from './buffet-select.page';

const routes: Routes = [
  {
    path: '',
    component: BuffetSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuffetSelectPageRoutingModule {}
