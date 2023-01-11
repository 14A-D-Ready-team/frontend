import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/products-list").then(m => m.ProductsListModule),
  },
  {
    path: "edit",
    loadChildren: () =>
      import("./feature/product-editor").then(m => m.ProductEditorPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
