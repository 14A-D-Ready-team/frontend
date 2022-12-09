import { FormControlErrors } from "./form-control-errors.type";

export class UpdateFormControlErrors {
  static readonly type = "[ExtendedFormPlugin] UpdateFormControlErrors";

  constructor(
    public payload: {
      errors: {
        [k: string]: string;
      };
      controlName: string;
      path: string;
      replace?: boolean;
    },
  ) {}
}

export class ResetFormControlErrors {
  static readonly type = "[ExtendedFormPlugin] ResetFormControlErrors";

  constructor(
    public payload: {
      controlName?: string;
      path: string;
    },
  ) {}
}
