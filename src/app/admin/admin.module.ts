import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { ExceptionsModule } from "@shared/exceptions";
import { AdminGuard } from "./shell";
import { AbilityModule } from "@casl/angular";

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, ExceptionsModule.forFeature({})],
  providers: [AdminGuard],
})
export class AdminModule {}
