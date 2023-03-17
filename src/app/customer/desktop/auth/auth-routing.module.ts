import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "email-verification",
    loadChildren: () =>
      import("./feature/email-verification-desktop").then(
        m => m.EmailVerificationDesktopPageModule,
      ),
  },
  {
    path: "send-password-reset",
    loadChildren: () =>
      import("./feature/send-password-reset-desktop").then(m => m.SendPasswordResetDesktopPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesktopAuthRoutingModule {}
