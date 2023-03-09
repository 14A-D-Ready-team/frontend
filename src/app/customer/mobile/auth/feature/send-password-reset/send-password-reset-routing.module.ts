import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SendPasswordResetPage } from "./send-password-reset.page";

const routes: Routes = [
  {
    path: "",
    component: SendPasswordResetPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendPasswordResetPageRoutingModule {}
