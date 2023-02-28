import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AdminShellComponent, AdminShellModule } from "./admin/shell";
import { SessionSigninPage } from "./auth/feature/session-signin";
import { AuthGuard, SessionSigninGuard } from "@shared/authentication";
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
    path: "",
    component: GuardedCustomerPage,
    canActivate: [AuthGuard],
  },
];

const routeWrapper: Routes = [
  {
    path: "",
    children: routes,
    canActivateChild: [SessionSigninGuard],
  },
  {
    path: "session-signin",
    component: SessionSigninPage,
    canActivate: [SessionSigninGuard],
    canDeactivate: [SessionSigninGuard],
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
