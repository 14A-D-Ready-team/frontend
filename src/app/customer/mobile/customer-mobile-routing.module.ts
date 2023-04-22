import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuffetSelectGuard } from "../utils";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./feature/main").then(m => m.MainPageModule),
    canActivateChild: [BuffetSelectGuard],
  },
  {
    path: "",
    loadChildren: () => import("./auth").then(m => m.AuthModule),
  },
  {
    path: "buffet-select",
    loadChildren: () =>
      import("./feature/buffet-select").then(m => m.BuffetSelectPageModule),
  },
  {
    path: "product",
    loadChildren: () =>
      import("./feature/product").then(m => m.ProductPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerMobileRoutingModule {}
