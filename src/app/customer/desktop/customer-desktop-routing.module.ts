import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./feature/main-desktop").then(m => m.MainDesktopPageModule),
  },
  {
    path: "",
    loadChildren: () => import("./auth").then(m => m.DesktopAuthModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./feature/main-desktop").then(m => m.MainDesktopPageModule),
  },
  {
    path: "buffet-select",
    loadChildren: () =>
      import("./feature/buffet-select").then(m => m.BuffetSelectPageModule),
  },
  {
    path: "welcome",
    loadChildren: () =>
      import("./feature/welcome/welcome.module").then(m => m.WelcomePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDesktopRoutingModule {}
