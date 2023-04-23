import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SendEmailVerificationFormComponent } from "./send-email-verification-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NgxsModule } from "@ngxs/store";
import { EmailVerificationState } from "./store";
import { ValidationMessageModule } from "@app/customer/ui/validation-message";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ErrorMessagePipe } from "@shared/exceptions";
import { RouterModule } from "@angular/router";
import { NavigationModule } from "@shared/navigation";

@NgModule({
  declarations: [SendEmailVerificationFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxsModule.forFeature([EmailVerificationState]),
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
    RouterModule,
    NavigationModule,
  ],
  exports: [SendEmailVerificationFormComponent],
})
export class SendEmailVerificationFormModule {}
