import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuffetSelectGuard } from "../utils";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/welcome/welcome.module").then(m => m.WelcomePageModule),
  },
  {
    path: "main",
    loadChildren: () =>
      import("./feature/main-desktop").then(m => m.MainDesktopPageModule),
    canActivateChild: [BuffetSelectGuard],
  },
  {
    path: "",
    loadChildren: () => import("./auth").then(m => m.DesktopAuthModule),
  },
  {
    path: "buffet-select",
    loadChildren: () =>
      import("./feature/buffet-select").then(m => m.BuffetSelectPageModule),
  },
  {
    path: "product",
    loadChildren: () =>
      import("./feature/product").then(m => m.ProductRoutingModule),
    canActivateChild: [BuffetSelectGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDesktopRoutingModule {}
