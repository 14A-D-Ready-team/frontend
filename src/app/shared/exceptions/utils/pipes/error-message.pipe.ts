import { Pipe, PipeTransform } from "@angular/core";
import { ExceptionService } from "../service";

@Pipe({
  name: "errorMessage",
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  constructor(private exceptionService: ExceptionService) {}

  public transform(value: any, ...args: unknown[]): string {
    return this.exceptionService.getErrorMessage(value);
  }
}
