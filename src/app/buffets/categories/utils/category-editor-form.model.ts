import { FormControl } from "@angular/forms";

export interface CategoryEditorFormModel {
  name: FormControl<string>;
  id: FormControl<number>;
}
