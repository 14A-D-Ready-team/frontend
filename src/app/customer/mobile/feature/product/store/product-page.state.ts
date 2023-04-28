import { FormControlStatus } from "@angular/forms";
import { FormControlErrors } from "@shared/extended-form-plugin";
import { OrderedProductDto } from "@shared/order";
import { Dictionary } from "lodash";

export interface ProductStatus {
  loading: boolean;
  error?: any;
}

export interface ProductStateModel {
  loginForm: {
    model: OrderedProductDto;
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
    formControlErrors: FormControlErrors;
  };
  status?: ProductStatus;
}
