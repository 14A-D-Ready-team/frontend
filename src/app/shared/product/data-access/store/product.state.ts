import { ApiRequestStatus, TargetedRequestStatus } from "@shared/store";
import {
  defaultEntityState,
  EntityState,
  EntityStateModel,
  IdStrategy,
} from "@ngxs-labs/entity-state";
import { Product } from "../entity";
import { State } from "@ngxs/store";
import { Injectable } from "@angular/core";

export type ProductStateModel = EntityStateModel<Product> & {
  updateStatus?: TargetedRequestStatus;
  createStatus?: ApiRequestStatus;
  deleteStatus?: TargetedRequestStatus;
};

@State<ProductStateModel>({
  name: "product",
  defaults: { ...defaultEntityState() },
})
@Injectable()
export class ProductState extends EntityState<Product> {
  constructor() {
    super(ProductState, "id", IdStrategy.EntityIdGenerator);
  }
}
