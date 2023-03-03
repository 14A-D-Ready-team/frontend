import { FormControl } from "@angular/forms";

export interface StringFilterFormModel {
  searchString: FormControl<string | null>;
}
