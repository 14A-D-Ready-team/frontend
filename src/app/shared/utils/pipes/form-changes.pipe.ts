import { Pipe, PipeTransform } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { delay, map, startWith } from "rxjs";
import { getFormChangesStream } from "../get-form-changes-stream.util";

@Pipe({
  name: "formChanges",
  standalone: true,
})
export class FormChangesPipe implements PipeTransform {
  public transform(value: AbstractControl) {
    return getFormChangesStream(value).pipe(
      map(() => true),
      startWith(true),
      // BUG: FormArray updates it's valid state AFTER it fires valueChanges, or statusChanges events
      // that's why the delay is needed
      delay(1),
    );
  }
}
