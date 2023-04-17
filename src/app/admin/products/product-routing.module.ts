import { NgModule } from "@angular/core";
import { Routes, RouterModule, ActivatedRouteSnapshot } from "@angular/router";
import { AppAbility } from "@app/app-ability.factory";
import { Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Action } from "@shared/policy";
import { Product } from "@shared/product";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/product-list").then(m => m.ProductListModule),
    data: {
      policyHandler: (ability: AppAbility) => ability.can(Action.Read, Product),
    },
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
    data: {
      policyHandler: (
        ability: AppAbility,
        route: ActivatedRouteSnapshot,
        store: Store,
      ) => {
        const activeBuffet: Buffet | undefined = store.selectSnapshot(
          BuffetState.active,
        );
        if (!activeBuffet) {
          return true;
        }
        console.log(ability);
        return ability.can(
          Action.Create,
          new Product({ buffetId: activeBuffet.id }),
        );
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
