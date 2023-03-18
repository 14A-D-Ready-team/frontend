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
      policyHandler: (ability: AppAbility, route: ActivatedRoute) => {
        /* const newLocal = ability.can(Action.Read, Category);
        console.log(newLocal);
        console.log(ability);
        return newLocal; */
        return true;
      },
    },
  },
  {
    path: "buffets",
    loadChildren: () => import("./buffets").then(m => m.BuffetsModule),
  },
  {
    path: "",
    loadChildren: () => import("./dashboard").then(m => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
