import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AdminShellComponent } from "./admin/shell";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/").then(m => m.AuthModule),
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/").then(m => m.AdminModule),
    data: {
      showAdminMenu: true,
    },
    component: AdminShellComponent,
  },
  {
    path: "customer",
    loadChildren: () => import("./customer/").then(m => m.CustomerModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: "enabledBlocking",
    }),
    AdminShellComponent,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
