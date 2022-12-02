import { Pipe, PipeTransform } from "@angular/core";
import { FormControl } from "@angular/forms";

@Pipe({
  name: "firstErrorMessage",
  standalone: true,
  pure: true,
})
export class FirstErrorMessagePipe implements PipeTransform {
  public transform(value: FormControl<never>, ...args: unknown[]): string {
    if (!value?.errors) {
      return "";
    }

    const a = Object.values(value.errors)[0];
    console.log(a);
    return a;
  }
}
