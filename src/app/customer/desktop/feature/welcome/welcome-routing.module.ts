import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WelcomePage } from "./welcome.page";
import { LoginFormComponent } from "@app/customer/auth/feature/login-form/login-form.component";
import { SignupFormComponent } from "@app/customer/auth/feature/signup-form/signup-form.component";

const routes: Routes = [
  {
    path: "",
    component: WelcomePage,
    children: [
      {
        path: "login",
        component: LoginFormComponent,
      },
      {
        path: "signup",
        component: SignupFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
