import { FormControl } from "@angular/forms";

export interface OptionFormModel {
  name: FormControl<string | null>;
  extraCost: FormControl<number | null>;
}
