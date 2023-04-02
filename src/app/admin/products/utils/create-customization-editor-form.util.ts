import { FormArray, FormGroup } from "@angular/forms";
import { EditCustomizationDto } from "@shared/product";
import {
  ClassValidatorFormArray,
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { CustomizationFormModel } from "./customization-form.model";
import { OptionFormModel } from "./option-form.model";

export function createCustomizationEditorForm() {
  return new ClassValidatorFormGroup<CustomizationFormModel>(
    EditCustomizationDto,
    {
      description: new ClassValidatorFormControl<string | null>(null),
      isMulti: new ClassValidatorFormControl<boolean>(false),
      options: new ClassValidatorFormArray([]) as FormArray<
        FormGroup<OptionFormModel>
      >,
    },
  );
}
