import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "transform",
  standalone: true,
})
export class TransformPipe implements PipeTransform {
  public transform<T, R>(value: T, transformFn: (value: T) => R): R {
    return transformFn(value);
  }
}
