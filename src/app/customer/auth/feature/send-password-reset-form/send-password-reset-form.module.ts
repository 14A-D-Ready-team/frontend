import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NgxsModule } from "@ngxs/store";
import { SendPasswordResetState } from "./store";
import { ValidationMessageModule } from "@app/customer/ui/validation-message";
import { ErrorMessagePipe } from "@shared/exceptions";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { SendPasswordResetFormComponent } from "./send-password-reset-form.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [SendPasswordResetFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxsModule.forFeature([SendPasswordResetState]),
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
    RouterModule,
  ],
  exports: [SendPasswordResetFormComponent],
})
export class SendPasswordResetFormModule {}
