import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "products",
    loadChildren: () => import("./products").then(m => m.ProductsModule),
  },
  {
    path: "categories",
    loadChildren: () => import("./categories").then(m => m.CategoriesModule),
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },

  {
    path: "buffets",
    loadChildren: () => import("./buffets").then(m => m.BuffetsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
