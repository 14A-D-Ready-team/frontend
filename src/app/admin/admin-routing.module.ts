import { NgModule } from "@angular/core";
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
import { AppAbility } from "@app/app-ability.factory";
import { Category } from "@shared/category";
import { Action } from "@shared/policy";

const routes: Routes = [
  {
    path: "products",
    loadChildren: () => import("./products").then(m => m.ProductsModule),
  },
  {
    path: "categories",
    loadChildren: () => import("./categories").then(m => m.CategoriesModule),
    data: {
      policyHandler: (ability: AppAbility, route: ActivatedRoute) =>
        ability.can(Action.Read, Category),
    },
  },
  {
    path: "test",
    loadChildren: () =>
      import("./test/test.module").then(m => m.TestPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
