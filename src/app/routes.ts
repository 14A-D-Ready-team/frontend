import { Routes } from "@angular/router";
import { AuthGuard, SessionSigninGuard } from "@shared/authentication";
import { AdminGuard, AdminShellComponent } from "./admin/shell";
import { SessionSigninPage } from "./auth";

const adminRoutes: Routes = [
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

function wrapRoutes(routes: Routes): Routes {
  return [
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
}

export const desktopRoutes = wrapRoutes([
  {
    path: "",
    loadChildren: () =>
      import("./customer/desktop").then(m => m.CustomerDesktopModule),
  },
  ...adminRoutes,
]);

export const mobileRoutes = wrapRoutes([
  {
    path: "",
    loadChildren: () =>
      import("./customer/mobile").then(m => m.CustomerMobileModule),
  },
  ...adminRoutes,
]);
