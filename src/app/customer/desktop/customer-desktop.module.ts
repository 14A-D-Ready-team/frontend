import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerDesktopRoutingModule } from "./customer-desktop-routing.module";
import { NavbarModule } from "./feature/navbar/navbar.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, CustomerDesktopRoutingModule, NavbarModule],
})
export class CustomerDesktopModule {}
