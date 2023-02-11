import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./feature/login").then(m => m.LoginPageModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./feature/signup").then(m => m.SignupPageModule),
  },
  {
    path: "email-verification",
    loadChildren: () =>
      import("./feature/email-verification").then(
        m => m.EmailVerificationPageModule,
      ),
  },  {
    path: 'send-password-reset',
    loadChildren: () => import('./feature/send-password-reset/send-password-reset.module').then( m => m.SendPasswordResetPageModule)
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
