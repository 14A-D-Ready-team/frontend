import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Platform,
  RefresherCustomEvent,
  InfiniteScrollCustomEvent,
} from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Observable, startWith, map, combineLatest, take } from "rxjs";
import { BuffetFilterState } from "../buffet-filter/store";
import { BuffetsListEffects } from "./store";
import {
  LoadPage,
  RetryLoading,
  Reload,
  LoadMore,
} from "./store/buffet-list.actions";
import { BuffetsListState } from "./store/buffet-list.state";

@Component({
  selector: "app-buffet-list",
  templateUrl: "./buffet-list.page.html",
  styleUrls: ["./buffet-list.page.scss"],
})
export class BuffetListPage implements OnInit, OnDestroy {
  @Select(BuffetsListState.shownBuffets)
  public buffets$!: Observable<Buffet[]>;

  @Select(BuffetState.loading)
  public loading$!: Observable<boolean>;

  @Select(BuffetState.error)
  public error$!: Observable<any>;

  @Select(BuffetFilterState.typing)
  public typing$!: Observable<boolean>;

  public isDesktop$ = this.platform.resize.pipe(
    startWith(undefined),
    map(() => this.platform.width() > 992),
  );

  public vm$ = combineLatest([
    this.buffets$,
    this.loading$,
    this.error$,
    this.typing$,
    this.isDesktop$,
  ]).pipe(
    map(
      ([
        buffets,
        loading,
        error,
        typing,
        isDesktop,
      ]) => ({
        buffets,
        loading,
        error,
        typing,
        isDesktop,
      }),
    ),
  );

  constructor(
    private store: Store,
    private effects: BuffetsListEffects,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new LoadPage());
    this.effects.start();
  }

  public ngOnDestroy(): void {
    this.effects.terminate();
  }

  public retryLoading() {
    this.store.dispatch(new RetryLoading());
  }

  public handleRefresh(event: any) {
    const refresherEvent = event as RefresherCustomEvent;
    return this.store
      .dispatch(new Reload())
      .pipe(take(1))
      .subscribe(() => refresherEvent.detail.complete());
  }

  public onIonInfinite(event: any) {
    this.store
      .dispatch(new LoadMore())
      .pipe(take(1))
      .subscribe(() => (event as InfiniteScrollCustomEvent).target.complete());
  }

  public buffetById(index: number, el: Buffet): number {
    return el.id;
  }

  public async editBuffet(buffet: Buffet) {
    this.router.navigate(["edit"], {
      queryParams: { id: buffet.id },
      relativeTo: this.route,
    });
  }

  public create() {
    this.router.navigate(["new"], {
      relativeTo: this.route,
    });
  }
}
