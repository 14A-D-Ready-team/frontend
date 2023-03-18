import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmailVerificationDesktopPage } from "./email-verification-desktop.page";

const routes: Routes = [
  {
    path: "",
    component: EmailVerificationDesktopPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailVerificationDesktopPageRoutingModule {}
