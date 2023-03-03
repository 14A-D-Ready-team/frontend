import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainDesktopPage } from './main-desktop.page';

const routes: Routes = [
  {
    path: '',
    component: MainDesktopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainDesktopPageRoutingModule {}
