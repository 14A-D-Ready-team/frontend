import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { OptionFormModel } from "./option-form.model";

export interface CustomizationFormModel {
  description: FormControl<string | null>;
  isMulti: FormControl<boolean>;
  options: FormArray<FormGroup<OptionFormModel>>;
}
