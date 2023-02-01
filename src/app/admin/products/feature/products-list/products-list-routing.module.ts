import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsListPage } from "./products-list.page";

const routes: Routes = [
  {
    path: "",
    component: ProductsListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsListRoutingModule {}