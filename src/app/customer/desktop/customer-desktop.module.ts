import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerDesktopRoutingModule } from "./customer-desktop-routing.module";
import { ProductComponent } from './feature/product/product.component';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [CommonModule, CustomerDesktopRoutingModule],
})
export class CustomerDesktopModule {}
