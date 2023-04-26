import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerDesktopRoutingModule } from "./customer-desktop-routing.module";
import { ProductComponent } from "./feature/product/product.component";
import { NavbarModule } from "./feature/navbar/navbar.module";

@NgModule({
    declarations: [ProductComponent],
    imports: [CommonModule, CustomerDesktopRoutingModule, NavbarModule]
})
export class CustomerDesktopModule {}
