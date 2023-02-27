import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import {
  LoadMore,
  LoadPage,
  Reload,
  RetryLoading,
} from "./buffet-list.actions";
import { Injectable } from "@angular/core";
import { BuffetActions, BuffetState, BuffetStateModel } from "@shared/buffet";
import { SearchBuffetsQuery } from "@shared/buffet/data-access/query";
import { DeepReadonly } from "@ngxs-labs/entity-state";
import { FilterChanged } from "../../buffet-filter/store";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuffetsListStateModel {
  buffetIds: number[];
  remainingItems?: number;
  query: DeepReadonly<SearchBuffetsQuery>;
}

export const buffetsLoadedPerScroll = 12;

@State<BuffetsListStateModel>({
  name: "buffetsList",
  defaults: {
    buffetIds: [],
    query: new SearchBuffetsQuery(),
  },
})
@Injectable()
export class BuffetsListState {
  constructor(private store: Store) {}

  @Selector([BuffetState])
  public static shownBuffets(
    state: BuffetsListStateModel,
    buffetState: BuffetStateModel,
  ) {
    return state.buffetIds.map(id => buffetState.entities[id]).filter(b => b);
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<BuffetsListStateModel>) {
    const state = ctx.getState();
    const query = SearchBuffetsQuery.clone({
      ...state.query,
      skip: 0,
      take: buffetsLoadedPerScroll,
    });
    
    return ctx.dispatch(new BuffetActions.Load(query));
  }

  @Action(LoadMore)
  public loadMore(ctx: StateContext<BuffetsListStateModel>) {
    const state = ctx.getState();
    if (state.remainingItems === 0) {
      return;
    }

      const query = SearchBuffetsQuery.clone({
        ...state.query,
        skip: state.buffetIds.length,
        take: buffetsLoadedPerScroll,
      });
    return ctx.dispatch(new BuffetActions.Load(query));
  }

  @Action(BuffetActions.LoadingSucceeded)
  public loadingSucceeded(
    ctx: StateContext<BuffetsListStateModel>,
    action: BuffetActions.LoadingSucceeded,
  ) {
    const state = ctx.getState();

    const newIds = [...state.buffetIds];
    //newIds.push(...action.buffets.map(b => b.id));
    newIds.splice(
      action.query.skip || 0,
      action.query.take || state.buffetIds.length,
      ...action.entities.map(b => b.id),
    );

   // const remaining = action.count - action.buffets.length;

    const remaining = action.count - (action.query.skip || 0) - action.entities.length;

    ctx.patchState({
      buffetIds: newIds,
      remainingItems: remaining,
    });
  }

  @Action(RetryLoading)
  public retryLoading(ctx: StateContext<BuffetsListStateModel>) {
    ctx.dispatch(new LoadMore());
  }

  @Action(Reload)
  public reload(ctx: StateContext<BuffetsListStateModel>) {
    const state = ctx.getState();
    const numberOfBuffets = state.buffetIds.length;
    const numberOfBuffetsToLoad =
      Math.max(1, Math.ceil(numberOfBuffets / buffetsLoadedPerScroll)) *
      buffetsLoadedPerScroll;

    ctx.patchState({
      buffetIds: [],
      remainingItems: undefined,
    });

    const query = SearchBuffetsQuery.clone({
      ...state.query,
      skip: 0,
      take: numberOfBuffetsToLoad,
    });

    return ctx.dispatch(new BuffetActions.Load(query));
  }

  @Action(FilterChanged, { cancelUncompleted: true })
  public filter(
    ctx: StateContext<BuffetsListStateModel>,
    action: FilterChanged,
  ) {
    ctx.patchState({
      query: action.filter,
      buffetIds: [],
      remainingItems: undefined,
    });

    const query = SearchBuffetsQuery.clone({
      ...action.filter,
      skip: 0,
      take: buffetsLoadedPerScroll,
    });

    return ctx.dispatch(new BuffetActions.Load(query));
  }
}
