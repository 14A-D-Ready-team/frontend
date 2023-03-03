import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import {
  AdminGuard,
  AdminShellComponent,
  AdminShellModule,
} from "./admin/shell";
import { AuthGuard, SessionSigninGuard } from "@shared/authentication";
import { SessionSigninPage } from "./customer/auth";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./customer/").then(m => m.CustomerModule),
  },
  {
    path: "admin",
    loadChildren: () => import("./admin/").then(m => m.AdminModule),
    data: {
      showAdminMenu: true,
    },
    component: AdminShellComponent,
    canActivateChild: [AuthGuard, AdminGuard],
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
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
