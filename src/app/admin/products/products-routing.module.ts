import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/product-list").then(m => m.ProductListModule),
  },
  /* {
    path: "edit",
    loadChildren: () =>
      import("./feature/product-editor").then(m => m.ProductEditorPageModule),
  }, */
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
export class ProductsRoutingModule {}
