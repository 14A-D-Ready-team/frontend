import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "admin/signup",
    loadChildren: () =>
      import("./feature/admin-signup").then(m => m.AdminSignupModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("../../customer/auth/feature/signup").then(m => m.SignupPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthRoutingModule { }
