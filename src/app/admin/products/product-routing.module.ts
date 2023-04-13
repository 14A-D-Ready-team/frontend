import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/product-list").then(m => m.ProductListModule),
  },
  {
    path: "details",
    loadChildren: () =>
      import("./feature/product-details").then(m => m.ProductDetailsPageModule),
  },
  {
    path: "new",
    loadChildren: () =>
      import("./feature/new-product").then(m => m.NewProductPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
