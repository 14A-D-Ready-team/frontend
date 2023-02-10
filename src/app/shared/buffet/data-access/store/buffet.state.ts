import { Injectable } from "@angular/core";
import { EntityStateModel, defaultEntityState, EntityState, IdStrategy, SetLoading, SetError, CreateOrReplace } from "@ngxs-labs/entity-state";
import { State, Action, StateContext } from "@ngxs/store";
import { TargetedRequestStatus, ApiRequestStatus } from "@shared/api";
import { Product, ProductStateModel } from "@shared/product";
import { switchMap, catchError, finalize } from "rxjs";
import { Buffet } from "../entity";
import { BuffetService } from "../service";
import { Load, LoadingSucceeded, LoadingFailed } from "./buffet.actions";

export type BuffetStateModel = EntityStateModel<Product> & {
    updateStatus?: TargetedRequestStatus;
    createStatus?: ApiRequestStatus;
    deleteStatus?: TargetedRequestStatus;
  };
  
  @State<BuffetStateModel>({
    name: "buffet",
    defaults: { ...defaultEntityState() },
  })
  @Injectable()
  export class BuffetState extends EntityState<Buffet> {
    constructor(private buffetService: BuffetService) {
      super(BuffetState, "id", IdStrategy.EntityIdGenerator);
    }
  
    @Action(Load, { cancelUncompleted: true })
    public load(ctx: StateContext<BuffetStateModel>, action: Load) {
      ctx.dispatch(new SetLoading(BuffetState, true));
      ctx.dispatch(new SetError(BuffetState, undefined));

      const query = action.query;
  
      return this.buffetService.find(query).pipe(
        switchMap(response =>
            ctx.dispatch(
              new LoadingSucceeded(query, response.items, response.count),
            ),
          ),
          catchError(error => ctx.dispatch(new LoadingFailed(error))),
          finalize(() => ctx.dispatch(new SetLoading(BuffetState, false))),
      );
    }
  
    @Action(LoadingFailed)
    public loadingFailed(
      ctx: StateContext<BuffetStateModel>,
      action: LoadingFailed,
    ) {
      return ctx.dispatch(new SetError(BuffetState, action.error));
    }
  
    @Action(LoadingSucceeded)
    public loadingSucceeded(
      ctx: StateContext<BuffetStateModel>,
      action: LoadingSucceeded,
    ) {
      return ctx.dispatch(new CreateOrReplace(BuffetState, action.buffets));
    }
  }