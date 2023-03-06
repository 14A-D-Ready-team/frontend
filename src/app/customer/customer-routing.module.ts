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
  {
    path: "product",
    loadChildren: () =>
      import("./feature/product").then(m => m.ProductPageModule),
  },
  {
    path: "main-desktop",
    loadChildren: () =>
      import("./desktop/feature/main-desktop").then(
        m => m.MainDesktopPageModule,
      ),
  },
  {
    path: "buffet-select-desktop",
    loadChildren: () =>
      import("./desktop/feature/buffet-select").then(
        m => m.BuffetSelectPageModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
