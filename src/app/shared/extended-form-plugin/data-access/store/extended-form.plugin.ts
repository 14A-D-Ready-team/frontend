import { Injectable } from "@angular/core";
import { UpdateFormErrors } from "@ngxs/form-plugin";
import {
  getActionTypeFromInstance,
  getValue,
  NgxsNextPluginFn,
  NgxsPlugin,
  setValue,
} from "@ngxs/store";
import { ResetFormControlErrors, UpdateFormControlErrors } from "./actions";

@Injectable()
export class ExtendedFormPlugin implements NgxsPlugin {
  public handle(state: any, action: any, next: NgxsNextPluginFn) {
    const type = getActionTypeFromInstance(action);
    let nextState = state;

    if (type === UpdateFormControlErrors.type) {
      const castAction = action as UpdateFormControlErrors;
      const path = `${action.payload.path}.formControlErrors.${castAction.payload.controlName}`;
      const previousErrors = getValue(nextState, path);

      nextState = setValue(nextState, path, {
        ...(castAction.payload.replace ? {} : previousErrors),
        ...castAction.payload.errors,
      });
    }

    if (type === ResetFormControlErrors.type) {
      const castAction = action as ResetFormControlErrors;
      if (!castAction.payload.controlName) {
        nextState = setValue(
          nextState,
          `${action.payload.path}.formControlErrors`,
          {},
        );
      } else {
        nextState = setValue(
          nextState,
          `${action.payload.path}.formControlErrors.${castAction.payload.controlName}`,
          null,
        );
      }
    }

    return next(nextState, action);
  }
}
