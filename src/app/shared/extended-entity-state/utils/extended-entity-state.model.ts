import { EntityState } from "@ngxs-labs/entity-state";
import {
  TargetedRequestStatus,
  ApiRequestStatus,
} from "./request-status.model";

export interface ExtendedEntityStateModel<T extends object>
  extends EntityState<T> {
  updateStatus?: TargetedRequestStatus;
  createStatus?: ApiRequestStatus;
  deleteStatus?: TargetedRequestStatus;
}
