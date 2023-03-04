import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSignupRoutingModule } from './admin-signup-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ErrorMessagePipe } from '@shared/exceptions';
import { ExtendedFormPluginModule } from '@shared/extended-form-plugin';
import { ExternalAuthModule } from '@shared/external-auth';
import { AdminSignupPage } from './admin-signup.page';


@NgModule({
  declarations: [AdminSignupPage],
  imports: [
    CommonModule,
    AdminSignupRoutingModule,
    FormsModule,
    IonicModule,
    //NgxsModule.forFeature([SignupState]),
    ExternalAuthModule.forFeature(),
    ExtendedFormPluginModule,
    ReactiveFormsModule,
    //ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
  ]
})
export class AdminSignupModule { }
