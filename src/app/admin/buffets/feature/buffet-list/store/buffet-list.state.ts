import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import {
  Delete,
  LoadMore,
  LoadPage,
  Reload,
  RetryLoading,
  SelectBuffet,
} from "./buffet-list.actions";
import { Injectable } from "@angular/core";
import { BuffetActions, BuffetState, BuffetStateModel } from "@shared/buffet";
import { SearchBuffetsQuery } from "@shared/buffet/data-access/query";
import { DeepReadonly, SetActive, SetError } from "@ngxs-labs/entity-state";
import { FilterChanged } from "../../buffet-filter/store";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";
import { concat } from "rxjs";
import { CategoryState } from "@shared/category";
import { NoBuffetSelectedException } from "@shared/buffet/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BuffetListStateModel {
  buffetIds: number[];
  remainingItems?: number;
  query: DeepReadonly<SearchBuffetsQuery>;
}

export const buffetsLoadedPerScroll = 12;

@State<BuffetListStateModel>({
  name: "adminBuffetsList",
  defaults: {
    buffetIds: [],
    query: new SearchBuffetsQuery(),
  },
})
@Injectable()
export class BuffetListState {
  constructor(private store: Store) {}

  @Selector([BuffetState])
  public static shownBuffets(
    state: BuffetListStateModel,
    buffetState: BuffetStateModel,
  ) {
    return state.buffetIds.map(id => buffetState.entities[id]).filter(b => b);
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<BuffetListStateModel>) {
    const state = ctx.getState();
    const query = new SearchBuffetsQuery({
      ...state.query,
      skip: 0,
      take: buffetsLoadedPerScroll,
      own: true,
    });

    return ctx.dispatch(new BuffetActions.Load(query));
  }

  @Action(LoadMore)
  public loadMore(ctx: StateContext<BuffetListStateModel>) {
    const state = ctx.getState();
    if (state.remainingItems === 0) {
      return;
    }

    const query = new SearchBuffetsQuery({
      ...state.query,
      skip: state.buffetIds.length,
      take: buffetsLoadedPerScroll,
      own: true,
    });
    return ctx.dispatch(new BuffetActions.Load(query));
  }

  @Action(BuffetActions.LoadingSucceeded)
  public loadingSucceeded(
    ctx: StateContext<BuffetListStateModel>,
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

  @Action(RetryLoading)
  public retryLoading(ctx: StateContext<BuffetListStateModel>) {
    ctx.dispatch(new LoadMore());
  }

  @Action(Reload)
  public reload(ctx: StateContext<BuffetListStateModel>) {
    const state = ctx.getState();
    const numberOfBuffets = state.buffetIds.length;
    const numberOfBuffetsToLoad =
      Math.max(1, Math.ceil(numberOfBuffets / buffetsLoadedPerScroll)) *
      buffetsLoadedPerScroll;

    ctx.patchState({
      buffetIds: [],
      remainingItems: undefined,
    });

    const query = new SearchBuffetsQuery({
      ...state.query,
      skip: 0,
      take: numberOfBuffetsToLoad,
      own: true,
    });

    return ctx.dispatch(new BuffetActions.Load(query));
  }

  @Action(FilterChanged, { cancelUncompleted: true })
  public filter(
    ctx: StateContext<BuffetListStateModel>,
    action: FilterChanged,
  ) {
    ctx.patchState({
      query: action.filter,
      buffetIds: [],
      remainingItems: undefined,
    });

    const query = new SearchBuffetsQuery({
      ...action.filter,
      skip: 0,
      take: buffetsLoadedPerScroll,
      own: true,
    });

    return ctx.dispatch(new BuffetActions.Load(query));
  }

  @Action(Delete)
  public delete(ctx: StateContext<BuffetListStateModel>, action: Delete) {
    return ctx.dispatch(new BuffetActions.Delete(+action.id));
  }

  @Action(SelectBuffet)
  public select(ctx: StateContext<BuffetListStateModel>, action: SelectBuffet) {
    if (
      this.store.selectSnapshot(CategoryState.error) instanceof
      NoBuffetSelectedException
    ) {
      this.store.dispatch(new SetError(CategoryState, undefined));
    }

    return ctx.dispatch(new SetActive(BuffetState, "" + action.id));
  }
}
