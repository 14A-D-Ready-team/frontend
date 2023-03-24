import { Injectable } from "@angular/core";
import { DeepReadonly } from "@ngxs-labs/entity-state";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { BuffetActions, BuffetState, BuffetStateModel } from "@shared/buffet";
import { SearchBuffetsQuery } from "@shared/buffet/data-access/query";
import {
  LoadMore,
  LoadPage,
  Reload,
  RetryLoading,
} from "./buffet-select.actions";

export interface BuffetSelectStateModel {
  buffetIds: number[];
  remainingItems?: number;
  query: DeepReadonly<SearchBuffetsQuery>;
}

export const buffetsLoadPerScroll = 8;

@State<BuffetSelectStateModel>({
  name: "buffetsSelect",
  defaults: {
    buffetIds: [],
    query: new SearchBuffetsQuery(),
  },
})
@Injectable()
export class BuffetSelectState {
  constructor(private store: Store) {}

  @Selector([BuffetState])
  public static shownBuffets(
    state: BuffetSelectStateModel,
    buffetState: BuffetStateModel,
  ) {
    return state.buffetIds.map(id => buffetState.entities[id]).filter(b => b);
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<BuffetSelectStateModel>) {
    const state = ctx.getState();
    const query = new SearchBuffetsQuery({
      ...state.query,
      skip: 0,
    });

    return ctx.dispatch(new BuffetActions.Load(query));
  }

  @Action(BuffetActions.LoadingSucceeded)
  public loadingSucceeded(
    ctx: StateContext<BuffetSelectStateModel>,
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

    const remaining =
      action.count - (action.query.skip || 0) - action.entities.length;

    ctx.patchState({
      buffetIds: newIds,
      remainingItems: remaining,
    });
  }
}
