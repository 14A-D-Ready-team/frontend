import { NgModule } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterModule,
  Routes,
} from "@angular/router";
import { AppAbility } from "@app/app-ability.factory";
import { Buffet } from "@shared/buffet";
import { Action } from "@shared/policy";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/buffet-list").then(m => m.BuffetListModule),
    data: {
      policyHandler: (ability: AppAbility) => ability.can(Action.Read, Buffet),
    },
  },
  {
    path: "edit",
    loadChildren: () =>
      import("./feature/buffet-editor").then(m => m.BuffetEditorModule),
  },
  {
    path: "new",
    loadChildren: () =>
      import("./feature/new-buffet").then(m => m.NewBuffetModule),
    data: {
      policyHandler: (ability: AppAbility) =>
        ability.can(Action.Create, Buffet),
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuffetsRoutingModule {}
