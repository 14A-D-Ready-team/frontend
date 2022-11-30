import { FormControl } from "@angular/forms";
import { ClassValidatorFormControl } from "ngx-reactive-form-class-validator";

export interface CategoryEditorFormModel {
  name: ClassValidatorFormControl<string>;
  id: ClassValidatorFormControl<number | null>;
}
