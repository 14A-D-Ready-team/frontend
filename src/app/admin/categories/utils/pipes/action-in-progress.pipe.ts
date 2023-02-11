import { Pipe, PipeTransform } from "@angular/core";
import { Category } from "@shared/category";
import { TargetedRequestStatus } from "@shared/extended-entity-state/utils";

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
