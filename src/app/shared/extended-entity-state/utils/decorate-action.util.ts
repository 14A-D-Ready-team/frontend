import { Type } from "@angular/core";
import { Action } from "@ngxs/store";

export function decorateAction<S extends object>({
  state,
  action,
  methodName,
}: {
  state: S;
  action: Type<any>;
  methodName: keyof S & string;
}) {
  Action(action as any)(
    state,
    methodName,
    Object.getOwnPropertyDescriptor(
      state,
      methodName,
    ) as TypedPropertyDescriptor<any>,
  );
}
