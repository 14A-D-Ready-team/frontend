import { Dictionary } from "@/types";
import { Type } from "@angular/core";
import {
  EntityState,
  SetError,
  SetLoading,
  IdStrategy,
  CreateOrReplace,
  Remove,
  StateSelector,
} from "@ngxs-labs/entity-state";
import { Action, createSelector, Selector, StateContext } from "@ngxs/store";
import { ApiService } from "@shared/api";
import { PaginatedResponse } from "@shared/api/utils/paginated.response";
import { catchError, delay, finalize, Observable, of, switchMap } from "rxjs";
import {
  ApiRequestStatus,
  createFailedStatus,
  createLoadingStatus,
  decorateAction,
  ExtendedEntityStateModel,
} from "../../utils";
import * as BaseActions from "./extended-entity.actions";

type Actions<EntityType extends object, Query, Create, Update> = {
  Load: Type<BaseActions.Load<Query>>;
  LoadingFailed: Type<BaseActions.LoadingFailed>;
  LoadingSucceeded: Type<BaseActions.LoadingSucceeded<EntityType, Query>>;
  Create: Type<BaseActions.Create<Create>>;
  CreateFailed: Type<BaseActions.CreateFailed>;
  CreateSucceeded: Type<BaseActions.CreateSucceeded<EntityType>>;
  Update: Type<BaseActions.Update<Update>>;
  UpdateFailed: Type<BaseActions.UpdateFailed>;
  UpdateSucceeded: Type<BaseActions.UpdateSucceeded<EntityType>>;
  Delete: Type<BaseActions.Delete>;
  DeleteFailed: Type<BaseActions.DeleteFailed>;
  DeleteSucceeded: Type<BaseActions.DeleteSucceeded>;
};

export class ExtendedEntityState<
  EntityType extends { id: number },
  Query,
  FindResultType extends EntityType[] | PaginatedResponse<EntityType>,
  Create,
  Update,
> extends EntityState<EntityType> {
  public static byId(id: number): StateSelector<any | undefined> {
    return createSelector(
      [this.entitiesMap],
      (entitiesMap: Dictionary<any>) => entitiesMap[id],
    );
  }

  public static get createStatus(): StateSelector<
    ApiRequestStatus | undefined
  > {
    return createSelector(
      [this],
      (state: ExtendedEntityStateModel<any>) => state.createStatus,
    );
  }

  public static get updateStatus(): StateSelector<
    ApiRequestStatus | undefined
  > {
    return createSelector(
      [this],
      (state: ExtendedEntityStateModel<any>) => state.updateStatus,
    );
  }

  public static get deleteStatus(): StateSelector<
    ApiRequestStatus | undefined
  > {
    return createSelector(
      [this],
      (state: ExtendedEntityStateModel<any>) => state.deleteStatus,
    );
  }

  protected readonly service: ApiService<
    EntityType,
    Query,
    FindResultType,
    Create,
    Update
  >;

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
    service: ApiService<EntityType, Query, FindResultType, Create, Update>;
    actions: Actions<EntityType, Query, Create, Update>;
  }) {
    super(storeClass, _idKey, idStrategy);
    this.service = service;
    this.storeClass = storeClass;
    this.actions = actions;
    this.decorateMethods();
  }

  public load(
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.Load<Query>,
  ) {
    ctx.dispatch(new SetLoading(this.storeClass, true));
    ctx.dispatch(new SetError(this.storeClass, undefined));

    const query = action.query;

    return this.service.find(query).pipe(
      switchMap(response => this.onLoadingSucceeded(response, ctx, action)),
      catchError(error => ctx.dispatch(new this.actions.LoadingFailed(error))),
      finalize(() => ctx.dispatch(new SetLoading(this.storeClass, false))),
    );
  }

  public onLoadingSucceeded(
    response: FindResultType,
    ctx: StateContext<ExtendedEntityStateModel<EntityType>>,
    action: BaseActions.Load<Query>,
  ): Observable<any> {
    if (Array.isArray(response)) {
      return ctx.dispatch(
        new this.actions.LoadingSucceeded(
          action.query,
          response,
          response.length,
        ),
      );
    }
    return ctx.dispatch(
      new this.actions.LoadingSucceeded(
        action.query,
        response.items,
        response.count,
      ),
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
      catchError(error =>
        of(undefined).pipe(
          switchMap(() => ctx.dispatch(new this.actions.CreateFailed(error))),
        ),
      ),
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

  private decorateMethods() {
    decorateAction({
      action: this.actions.Load,
      methodName: "load",
      state: this,
    });
    decorateAction({
      action: this.actions.LoadingFailed,
      methodName: "loadingFailed",
      state: this,
    });
    decorateAction({
      action: this.actions.LoadingSucceeded,
      methodName: "loadingSucceeded",
      state: this,
    });
    decorateAction({
      action: this.actions.Create,
      methodName: "createEntity",
      state: this,
    });
    decorateAction({
      action: this.actions.CreateSucceeded,
      methodName: "createSucceeded",
      state: this,
    });
    decorateAction({
      action: this.actions.CreateFailed,
      methodName: "createFailed",
      state: this,
    });
    decorateAction({
      action: this.actions.Update,
      methodName: "updateEntity",
      state: this,
    });
    decorateAction({
      action: this.actions.UpdateSucceeded,
      methodName: "updateSucceeded",
      state: this,
    });
    decorateAction({
      action: this.actions.UpdateFailed,
      methodName: "updateFailed",
      state: this,
    });
    decorateAction({
      action: this.actions.Delete,
      methodName: "deleteEntity",
      state: this,
    });
    decorateAction({
      action: this.actions.DeleteSucceeded,
      methodName: "deleteSucceeded",
      state: this,
    });
    decorateAction({
      action: this.actions.DeleteFailed,
      methodName: "deleteFailed",
      state: this,
    });
  }
}
