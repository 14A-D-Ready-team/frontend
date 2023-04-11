import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { UpdateProductDto } from "@shared/product";
import {
  ClassValidatorFormArray,
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { CustomizationFormModel } from "./customization-form.model";
import { ProductEditorFormModel } from "./product-editor-form.model";

export function createProductEditorForm() {
  return new ClassValidatorFormGroup<ProductEditorFormModel>(UpdateProductDto, {
    categoryId: new ClassValidatorFormControl<number | null>(null),
    name: new ClassValidatorFormControl<string | null>(null),
    image: new FormControl<File | null>(null),
    description: new ClassValidatorFormControl<string | null>(null),
    discountedPrice: new ClassValidatorFormControl<number | null>(null),
    fullPrice: new ClassValidatorFormControl<number | null>(null),
    stock: new ClassValidatorFormControl<number | null>(null),
    customizations: new ClassValidatorFormArray([]) as FormArray<
      FormGroup<CustomizationFormModel>
    >,
  });
}
