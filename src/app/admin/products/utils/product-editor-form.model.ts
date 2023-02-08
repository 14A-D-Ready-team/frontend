import { FormControl } from "@angular/forms";

export interface ProductEditorFormModel {
  categoryId: FormControl<number | null>;
  name: FormControl<string | null>;
  image: FormControl<File | null>;
  description: FormControl<string | null>;
  discountedPrice: FormControl<number | null>;
  fullPrice: FormControl<number | null>;
  stock: FormControl<number | null>;
}
