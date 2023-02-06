import { Type } from "@angular/core";
import {
  EntityState,
  SetError,
  SetLoading,
  IdStrategy,
  CreateOrReplace,
} from "@ngxs-labs/entity-state";
import { Action, StateContext } from "@ngxs/store";
import { ApiServiceWithPagination } from "@shared/api";
import { catchError, finalize, switchMap } from "rxjs";
import { ExtendedEntityStateModel } from "../../utils";
import * as BaseActions from "./extended-entity.actions.base";

type Actions<EntityType extends object, Query, Create, Update> = {
  Load: Type<BaseActions.Load<Query>>;
  LoadingFailed: Type<BaseActions.LoadingFailed>;
  LoadingSucceeded: Type<BaseActions.LoadingSucceeded<EntityType>>;
  Create: Type<BaseActions.Create<Create>>;
  CreateFailed: Type<BaseActions.CreateFailed>;
  CreateSucceeded: Type<BaseActions.CreateSucceeded<EntityType>>;
  Update: Type<BaseActions.Update<Update>>;
  UpdateFailed: Type<BaseActions.UpdateFailed>;
  UpdateSucceeded: Type<BaseActions.UpdateSucceeded<Update>>;
  Delete: Type<BaseActions.Delete>;
  DeleteFailed: Type<BaseActions.DeleteFailed>;
  DeleteSucceeded: Type<BaseActions.DeleteSucceeded>;
};

export abstract class ExtendedEntityState<
  EntityType extends object,
  Query,
  Create,
  Update,
> extends EntityState<EntityType> {
  protected readonly service: ApiServiceWithPagination<EntityType, Query>;

  protected readonly storeClass: Type<EntityState<EntityType>>;

  protected readonly actions: Actions<EntityType, Query, Create, Update>;

  constructor({
    storeClass,
    _idKey,
    idStrategy,
    service,
    actions,
  }: {
    storeClass: Type<EntityState<EntityType>>;
    _idKey: keyof EntityType;
    idStrategy: Type<IdStrategy.IdGenerator<EntityType>>;
    service: ApiServiceWithPagination<EntityType, Query>;
    actions: Actions<EntityType, Query, Create, Update>;
  }) {
    super(storeClass, _idKey, idStrategy);
    this.service = service;
    this.storeClass = storeClass;
    this.actions = actions;
  }

  public load(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.Load<Query>,
  ) {
    ctx.dispatch(new SetLoading(this.storeClass, true));
    ctx.dispatch(new SetError(this.storeClass, undefined));

    const query = action.query;

    return this.service.find(query).pipe(
      switchMap(response =>
        ctx.dispatch(
          new this.actions.LoadingSucceeded(
            query,
            response.items,
            response.count,
          ),
        ),
      ),
      catchError(error => ctx.dispatch(new this.actions.LoadingFailed(error))),
      finalize(() => ctx.dispatch(new SetLoading(this.storeClass, false))),
    );
  }

  public loadingFailed(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.LoadingFailed,
  ) {
    return ctx.dispatch(new SetError(this.storeClass, action.error));
  }

  public loadingSucceeded(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.LoadingSucceeded<EntityType>,
  ) {
    return ctx.dispatch(new CreateOrReplace(this.storeClass, action.entities));
  }

  public create(ctx: StateContext<CategoryStateModel>, action: Create) {
    ctx.patchState({ createStatus: this.getLoadingStatus() });

    return this.categoryService.create(action.payload).pipe(
      switchMap(category => ctx.dispatch(new CreateSucceeded(category))),
      catchError(error => ctx.dispatch(new CreateFailed(error))),
    );
  }
}
