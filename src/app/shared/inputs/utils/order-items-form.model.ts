import { FormControl } from "@angular/forms";

export interface OrderItemsFormModel {
  order: FormControl<string | null>;
  orderByField: FormControl<string>;
}
