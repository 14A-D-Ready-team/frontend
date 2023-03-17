import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { ExceptionsModule } from "@app/shared/exceptions";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    ExceptionsModule.forFeature({
      InvalidDataException: "Hibás adatok kerültek megasádsra!",
    }),
  ]
})
export class AdminAuthModule { }
