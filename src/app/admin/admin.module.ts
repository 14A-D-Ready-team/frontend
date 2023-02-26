import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { ExceptionsModule } from "@shared/exceptions";

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, ExceptionsModule.forFeature({})],
})
export class AdminModule {}
