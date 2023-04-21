import { Routes } from "@angular/router";
import { AdminGuard, AdminShellComponent } from "./admin/shell";

const adminRoutes: Routes = [
  {
    path: "admin",
    loadChildren: () => import("./admin/").then(m => m.AdminModule),
    data: {
      showAdminMenu: true,
    },
    component: AdminShellComponent,
    canActivateChild: [AdminGuard],
  },
  {
    path: "admin-signup",
    loadChildren: () =>
      import("./admin/auth/admin-auth.module").then(m => m.AdminAuthModule),
  },
];

export const desktopRoutes = [
  {
    path: "",
    loadChildren: () =>
      import("./customer/desktop").then(m => m.CustomerDesktopModule),
  },
  ...adminRoutes,
];

export const mobileRoutes = [
  {
    path: "",
    loadChildren: () =>
      import("./customer/mobile").then(m => m.CustomerMobileModule),
  },
  ...adminRoutes,
];
