import { Dictionary } from "@/types";
import { FormControlStatus } from "@angular/forms";
import { FormControlErrors } from "../data-access";

export interface NgxsFormStateModel<T> {
  model: T;
  dirty: boolean;
  status: FormControlStatus;
  errors: Dictionary<any>;
  disabled: boolean;
  formControlErrors: FormControlErrors;
}
