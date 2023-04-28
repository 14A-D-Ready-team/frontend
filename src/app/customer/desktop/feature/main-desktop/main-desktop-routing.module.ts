import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainDesktopPage } from "./main-desktop.page";
import { ProductComponent } from "../product/product.component";

const routes: Routes = [
  {
    path: "",
    component: MainDesktopPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainDesktopPageRoutingModule {}
