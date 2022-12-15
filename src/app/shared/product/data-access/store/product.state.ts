import { ApiRequestStatus, TargetedRequestStatus } from "@shared/api";
import {
  defaultEntityState,
  EntityState,
  EntityStateModel,
  IdStrategy,
} from "@ngxs-labs/entity-state";
import { Product } from "../entity";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ProductService } from "../service";
import { LoadPaginated } from "./product.actions";

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
  constructor(private productService: ProductService) {
    super(ProductState, "id", IdStrategy.EntityIdGenerator);
  }

  @Action(LoadPaginated)
  public loadPaginated(
    ctx: StateContext<ProductStateModel>,
    action: LoadPaginated,
  ) {}
}
