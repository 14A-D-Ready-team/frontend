import { AbstractControl } from "@angular/forms";
import { map, merge } from "rxjs";

export function getFormChangesStream(control: AbstractControl) {
  const valueChanges$ = control.valueChanges.pipe(
    map<any, void>(() => undefined),
  );
  const statusChanges$ = control.valueChanges.pipe(
    map<any, void>(() => undefined),
  );

  return merge(valueChanges$, statusChanges$);
}
