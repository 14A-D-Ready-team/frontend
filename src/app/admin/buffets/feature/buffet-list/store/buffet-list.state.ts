import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import {
  LoadMore,
  LoadPage,
  Reload,
  RetryLoading,
} from "./buffet-list.actions";
import { Injectable } from "@angular/core";
import { take } from "rxjs";

import { BuffetActions, BuffetState, BuffetStateModel } from "@shared/buffet";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuffetsListStateModel {
  buffetIds: number[];
  remainingItems?: number;
  //query: DeepReadonly<FilterProductsQuery>;
}

export const buffetsLoadedPerScroll = 12;

@State<BuffetsListStateModel>({
  name: "buffetsList",
  defaults: {
    buffetIds: [],
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
    console.log(state);
    console.log(buffetState);
    return state.buffetIds.map(id => buffetState.entities[id]).filter(b => b);
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<BuffetsListStateModel>) {

    const state = ctx.getState();
    //   const query = FilterProductsQuery.createOrCopy({
    //     ...state.query,
    //     skip: 0,
    //     take: productsLoadedPerScroll,
    //   });

    return ctx.dispatch(new BuffetActions.Load());
  }

  @Action(LoadMore)
  public loadMore(ctx: StateContext<BuffetsListStateModel>) {
    const state = ctx.getState();
    if (state.remainingItems === 0) {
      return;
    }

    //   const query = FilterProductsQuery.createOrCopy({
    //     ...state.query,
    //     skip: state.productIds.length,
    //     take: productsLoadedPerScroll,
    //   });
    return ctx.dispatch(new BuffetActions.Load());
  }

  @Action(BuffetActions.LoadingSucceeded)
  public loadingSucceeded(
    ctx: StateContext<BuffetsListStateModel>,
    action: BuffetActions.LoadingSucceeded,
  ) {
    const state = ctx.getState();

    const newIds = [...state.buffetIds];
    newIds.push(
      
      ...action.buffets.map(b => b.id),
    );

    // const remaining =
    //   action.count - (action.query.skip || 0) - action.products.length;

    ctx.patchState({
      buffetIds: newIds,
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

    // const query = FilterProductsQuery.createOrCopy({
    //   ...state.query,
    //   skip: 0,
    //   take: numberOfProductsToLoad,
    // });

    //return ctx.dispatch(new BuffetActions.Load(query));
    return ctx.dispatch(new BuffetActions.Load());
  }

  // @Action(FilterChanged, { cancelUncompleted: true })
  // public filter(
  //   ctx: StateContext<BuffetsListStateModel>,
  //   action: FilterChanged,
  // ) {
  //   ctx.patchState({
  //     //query: action.filter,
  //     buffetIds: [],
  //     remainingItems: undefined,
  //   });

  //   // const query = FilterProductsQuery.createOrCopy({
  //   //   ...action.filter,
  //   //   skip: 0,
  //   //   take: buffetsLoadedPerScroll,
  //   // });

  //   //return ctx.dispatch(new ProductActions.Load(query));
  //   return ctx.dispatch(new BuffetActions.Load());
  // }
}
