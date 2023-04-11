import { EditOptionDto } from "@shared/product";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { OptionFormModel } from "./option-form.model";

export function createOptionEditorForm() {
  return new ClassValidatorFormGroup<OptionFormModel>(EditOptionDto, {
    name: new ClassValidatorFormControl<string | null>(),
    extraCost: new ClassValidatorFormControl<number | null>(),
  });
}
