import { Pipe, PipeTransform } from "@angular/core";
import { FormControl, ValidationErrors } from "@angular/forms";

@Pipe({
  name: "firstErrorMessage",
  standalone: true,
  pure: true,
})
export class FirstErrorMessagePipe implements PipeTransform {
  public transform(value: ValidationErrors | null | undefined): string {
    if (!value) {
      return "";
    }

    return Object.values(value)[0];
  }
}
