import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { AuthShellComponent } from "./auth-shell.component";
import { ErrorMessagePipe, ExceptionsModule } from "@shared/exceptions";

@NgModule({
  declarations: [AuthShellComponent],
  imports: [
    CommonModule,
    IonicModule,
    ExceptionsModule.forFeature({}),
    ErrorMessagePipe,
  ],
})
export class AuthShellModule {}
