import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupFormComponent } from "./signup-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ExternalAuthModule } from "@shared/external-auth";
import { ExtendedFormPluginModule } from "@shared/extended-form-plugin";
import { ValidationMessageModule } from "@app/customer/ui/validation-message";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ErrorMessagePipe } from "@shared/exceptions";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExternalAuthModule.forFeature(),
    ExtendedFormPluginModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
  ],
  declarations: [SignupFormComponent],
  exports: [SignupFormComponent]
})
export class SignupFormModule {}
