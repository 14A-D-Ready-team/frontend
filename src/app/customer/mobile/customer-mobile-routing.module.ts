import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuffetSelectGuard, ProductPageGuard } from "../utils";

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
    canActivateChild: [ProductPageGuard],
  },
  {
    path: "cart-mobile",
    loadChildren: () =>
      import("./feature/cart-mobile").then(m => m.CartMobilePageModule),
  },
  {
    path: "order-details",
    loadChildren: () =>
      import("./feature/order-details").then(m => m.OrderDetailsPageModule),
  },
  {
    path: "profile-mobile",
    loadChildren: () =>
      import("./feature/profile-mobile").then(m => m.ProfileMobilePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerMobileRoutingModule {}
