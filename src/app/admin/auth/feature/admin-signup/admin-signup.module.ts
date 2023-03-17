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
import { AdminValidationMessageComponent } from '@app/admin/auth/ui/admin-validation-message';
import { NgxsModule } from '@ngxs/store';
import { AdminSignupState } from './store';
import { AdminValidationMessageModule } from "../../ui/admin-validation-message";


@NgModule({
    declarations: [AdminSignupPage],
    imports: [
        CommonModule,
        AdminSignupRoutingModule,
        FormsModule,
        IonicModule,
        NgxsModule.forFeature([AdminSignupState]),
        ExternalAuthModule.forFeature(),
        ExtendedFormPluginModule,
        ReactiveFormsModule,
        NgxsFormPluginModule,
        ErrorMessagePipe,
        AdminValidationMessageModule
    ]
})
export class AdminSignupModule { }
