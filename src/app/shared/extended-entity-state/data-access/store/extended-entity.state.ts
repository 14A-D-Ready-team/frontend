import { Type } from "@angular/core";
import {
  EntityState,
  SetError,
  SetLoading,
  IdStrategy,
  CreateOrReplace,
  Remove,
} from "@ngxs-labs/entity-state";
import { StateContext } from "@ngxs/store";
import { ApiService, ApiServiceWithPagination } from "@shared/api";
import { catchError, finalize, switchMap } from "rxjs";
import {
  createFailedStatus,
  createLoadingStatus,
  ExtendedEntityStateModel,
} from "../../utils";
import * as BaseActions from "./extended-entity.actions.base";

type Actions<EntityType extends object, Query, Create, Update> = {
  Load: Type<BaseActions.Load<Query>>;
  LoadingFailed: Type<BaseActions.LoadingFailed>;
  LoadingSucceeded: Type<BaseActions.LoadingSucceeded<EntityType, Query>>;
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
  EntityType extends { id: number },
  Query,
  Create,
  Update,
> extends EntityState<EntityType> {
  protected readonly service: ApiServiceWithPagination<EntityType, Query> &
    ApiService<EntityType, Create, Update>;

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
    service: ApiServiceWithPagination<EntityType, Query> &
      ApiService<EntityType, Create, Update>;
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
    action: BaseActions.LoadingSucceeded<EntityType, Query>,
  ) {
    return ctx.dispatch(new CreateOrReplace(this.storeClass, action.entities));
  }

  public createEntity(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.Create<Create>,
  ) {
    ctx.patchState({ createStatus: createLoadingStatus() });

    return this.service.create(action.payload).pipe(
      switchMap(entity =>
        ctx.dispatch(new this.actions.CreateSucceeded(entity)),
      ),
      catchError(error => ctx.dispatch(new this.actions.CreateFailed(error))),
    );
  }

  public createSucceeded(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.CreateSucceeded<EntityType>,
  ) {
    ctx.patchState({ createStatus: undefined });
    return ctx.dispatch(new CreateOrReplace(this.storeClass, action.entity));
  }

  public createFailed(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.CreateFailed,
  ) {
    ctx.patchState({ createStatus: createFailedStatus(action.error) });
  }

  public updateEntity(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.Update<Update>,
  ) {
    ctx.patchState({ updateStatus: createLoadingStatus(action.id) });

    return this.service.update(action.id, action.payload).pipe(
      switchMap(entity =>
        ctx.dispatch(new this.actions.UpdateSucceeded(entity)),
      ),
      catchError(error => ctx.dispatch(new this.actions.UpdateFailed(error))),
    );
  }

  public updateSucceeded(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.UpdateSucceeded<EntityType>,
  ) {
    ctx.patchState({ updateStatus: undefined });
    return ctx.dispatch(new CreateOrReplace(this.storeClass, action.entity));
  }

  public updateFailed(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.UpdateFailed,
  ) {
    const state = ctx.getState();
    ctx.patchState({
      updateStatus: createFailedStatus(
        action.error,
        state.updateStatus?.targetId || -1,
      ),
    });
  }

  public deleteEntity(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.Delete,
  ) {
    ctx.patchState({ deleteStatus: createLoadingStatus(action.id) });

    return this.service.delete(action.id).pipe(
      switchMap(() =>
        ctx.dispatch(new this.actions.DeleteSucceeded(action.id)),
      ),
      catchError(error => ctx.dispatch(new this.actions.DeleteFailed(error))),
    );
  }

  public deleteSucceeded(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.DeleteSucceeded,
  ) {
    ctx.patchState({ deleteStatus: undefined });

    return ctx.dispatch(
      new Remove(this.storeClass, entity => entity.id === action.id),
    );
  }

  public deleteFailed(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.DeleteFailed,
  ) {
    const state = ctx.getState();

    ctx.patchState({
      deleteStatus: createFailedStatus(
        action.error,
        state.deleteStatus?.targetId || -1,
      ),
    });
  }
}
