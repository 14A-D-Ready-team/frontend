import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { ExceptionsModule } from "@app/shared/exceptions";
import { errorMessages } from "./utils";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ExceptionsModule.forFeature(errorMessages),
  ],
})
export class CategoriesModule {}
