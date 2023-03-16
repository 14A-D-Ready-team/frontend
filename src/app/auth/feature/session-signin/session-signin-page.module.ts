import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { SessionSigninPage } from "./session-signin.page";
import { ErrorMessagePipe, ExceptionsModule } from "@shared/exceptions";

@NgModule({
  declarations: [SessionSigninPage],
  imports: [
    CommonModule,
    IonicModule,
    ExceptionsModule.forFeature({}),
    ErrorMessagePipe,
  ],
})
export class SessionSigninPageModule {}
