import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule],
  exports: [RouterModule],
})
export class AuthModule {}
