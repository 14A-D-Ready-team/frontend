import { Pipe, PipeTransform } from "@angular/core";
import { Category, TargetedRequestStatus } from "@shared/category";

@Pipe({
  name: "actionInProgress",
  standalone: true,
  pure: true,
})
export class ActionInProgressPipe implements PipeTransform {
  public transform(
    status: TargetedRequestStatus | undefined,
    category: Category,
  ): boolean {
    return !!status?.loading && status?.targetId === category.id;
  }
}
