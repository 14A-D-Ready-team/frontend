import { Type } from "@angular/core";
import {
  EntityState,
  SetError,
  SetLoading,
  IdStrategy,
} from "@ngxs-labs/entity-state";
import { Action, StateContext } from "@ngxs/store";
import { ApiServiceWithPagination } from "@shared/api";
import { catchError, finalize, switchMap } from "rxjs";
import { ExtendedEntityStateModel } from "../../utils";
import * as BaseActions from "./extended-entity.actions.base";

export abstract class ExtendedEntityState<
  T extends object,
  Q,
> extends EntityState<T> {
  protected readonly service: ApiServiceWithPagination<T, Q>;

  protected readonly storeClass: Type<EntityState<T>>;

  protected readonly actions: {
    Load: Type<>;
    LoadingFailed: Type<>;
    LoadingSucceeded: Type<>;
    Create: Type<>;
    CreateFailed: Type<>;
    CreateSucceeded: Type<>;
    Update: Type<>;
    UpdateFailed: Type<>;
    UpdateSucceeded: Type<>;
    Delete: Type<>;
    DeleteFailed: Type<>;
    DeleteSucceeded: Type<>;
  };

  constructor({
    storeClass,
    _idKey,
    idStrategy,
    service,
  }: {
    storeClass: Type<EntityState<T>>;
    _idKey: keyof T;
    idStrategy: Type<IdStrategy.IdGenerator<T>>;
    service: ApiServiceWithPagination<T, Q>;
  }) {
    super(storeClass, _idKey, idStrategy);
    this.service = service;
    this.storeClass = storeClass;
  }

  public load(
    ctx: StateContext<ExtendedEntityStateModel<T>>,
    action: BaseActions.Load<Q>,
  ) {
    ctx.dispatch(new SetLoading(this.storeClass, true));
    ctx.dispatch(new SetError(this.storeClass, undefined));

    const query = action.query;

    return this.service.find(query).pipe(
      switchMap(response =>
        ctx.dispatch(
          new LoadingSucceeded(query, response.items, response.count),
        ),
      ),
      catchError(error => ctx.dispatch(new LoadingFailed(error))),
      finalize(() => ctx.dispatch(new SetLoading(this.storeClass, false))),
    );
  }
}
