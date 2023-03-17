import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SendPasswordResetDesktopPage } from "./send-password-reset-desktop.page";

const routes: Routes = [
  {
    path: "",
    component: SendPasswordResetDesktopPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendPasswordResetDesktopPageRoutingModule {}
