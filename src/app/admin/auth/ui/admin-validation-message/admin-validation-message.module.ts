import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminValidationMessageComponent } from "./admin-validation-message.component";

@NgModule({
  declarations: [AdminValidationMessageComponent],
  imports: [CommonModule],
  exports: [AdminValidationMessageComponent],
})
export class ValidationMessageModule {}
