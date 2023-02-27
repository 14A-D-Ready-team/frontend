import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AdminShellComponent, AdminShellModule } from "./admin/shell";
import { AuthShellComponent } from "./auth/feature/shell";
import { AuthGuard, SessionLoginGuard } from "./auth/utils";
import { GuardedCustomerPage } from "./guarded-customer/guarded-customer.page";

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
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: "guarded-customer-route",
    component: GuardedCustomerPage,
    canActivate: [AuthGuard],
  },
];

const routeWrapper: Routes = [
  {
    path: "",
    children: routes,
    component: AuthShellComponent,
    canActivate: [SessionLoginGuard],
    canActivateChild: [SessionLoginGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routeWrapper, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: "enabledBlocking",
    }),
    AdminShellModule,
    GuardedCustomerPage,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
