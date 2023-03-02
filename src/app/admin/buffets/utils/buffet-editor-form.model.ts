import { FormControl } from "@angular/forms";

export interface BuffetEditorFormModel {
  name: FormControl<string | null>;
  coords: FormControl<string | null>;
  address: FormControl<string | null>;
  hours: FormControl<string | null>;
  description: FormControl<string | null>;
  image: FormControl<File | null>;
}