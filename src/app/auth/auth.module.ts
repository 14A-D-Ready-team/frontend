import { AuthState } from "./data-access/auth.state";
import { NgxsModule } from "@ngxs/store";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxsModule.forFeature([AuthState]),
  ],
  exports: [RouterModule],
})
export class AuthModule {}
