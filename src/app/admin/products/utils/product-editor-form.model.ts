import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { CustomizationFormModel } from "./customization-form.model";

export interface ProductEditorFormModel {
  categoryId: FormControl<number | null>;
  name: FormControl<string | null>;
  image: FormControl<File | null>;
  initialImageUrl?: FormControl<string | null>;
  description: FormControl<string | null>;
  discountedPrice: FormControl<number | null>;
  fullPrice: FormControl<number | null>;
  stock: FormControl<number | null>;
  customizations: FormArray<FormGroup<CustomizationFormModel>>;
}
