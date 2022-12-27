import { FormControl } from "@angular/forms";
import { NumericFilterType } from "../../api/utils/numeric-filter-type.enum";

export interface NumericFilterFormModel {
  min: FormControl<number | null>;
  max: FormControl<number | null>;
  value: FormControl<number | null>;
  type: FormControl<NumericFilterType>;
}
