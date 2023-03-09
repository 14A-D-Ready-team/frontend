import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./feature/main").then(m => m.MainPageModule),
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerMobileRoutingModule {}
