import { Dictionary } from "@/types";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Category, CategoryState, loadCategories } from "@shared/category";
import { Product, ProductState } from "@app/shared/product";
import {
  InfiniteScrollCustomEvent,
  Platform,
  RefresherCustomEvent,
} from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import {
  combineLatest,
  filter,
  map,
  Observable,
  startWith,
  Subscription,
  switchMap,
  take,
} from "rxjs";
import {
  LoadMore,
  LoadPage,
  ProductListEffects,
  ProductListState,
  Reload,
  RetryLoading,
} from "./store";
import { KeyValue } from "@angular/common";
import { ProductFilterState } from "../product-filter";
import { ActivatedRoute, Router } from "@angular/router";
import { NoBuffetSelectedException } from "@shared/buffet/utils";
import { groupBy } from "@shared/utils";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.page.html",
  styleUrls: ["./product-list.page.scss"],
})
export class ProductListPage implements OnInit, OnDestroy {
  @Select(ProductListState.shownProducts)
  public products$!: Observable<Product[]>;

  @Select(CategoryState.categoriesOfActiveBuffet)
  public categories$!: Observable<Category[]>;

  @Select(ProductState.loading)
  public loading$!: Observable<boolean>;

  @Select(CategoryState.loading)
  public categoriesLoading$!: Observable<boolean>;

  @Select(ProductState.error)
  public error$!: Observable<any>;

  @Select(ProductFilterState.typing)
  public typing$!: Observable<boolean>;

  @Select(CategoryState.error)
  public categoryError$!: Observable<any>;

  public isDesktop$ = this.platform.resize.pipe(
    startWith(undefined),
    map(() => this.platform.width() >= 992),
  );

  public vm$ = combineLatest([
    this.products$,
    this.categories$,
    this.loading$,
    this.categoriesLoading$,
    this.error$,
    this.typing$,
    this.isDesktop$,
    this.categoryError$,
  ]).pipe(
    map(
      ([
        products,
        categories,
        loading,
        categoriesLoading,
        error,
        typing,
        isDesktop,
        categoryError,
      ]) => ({
        products,
        categories,
        categoriesMap: categories && groupBy(categories, "id"),
        loading,
        categoriesLoading,
        error,
        typing,
        isDesktop,
        categoryError,
        noBuffetSelected: categoryError instanceof NoBuffetSelectedException,
      }),
    ),
  );

  private sub: Subscription;

  constructor(
    private store: Store,
    private effects: ProductListEffects,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.sub = route.url
      .pipe(
        map(() => route.component),
        filter(c => c === ProductListPage),
        switchMap(() => this.store.dispatch(new LoadPage())),
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.store.dispatch(new LoadPage());
    this.effects.start();
  }

  public ngOnDestroy(): void {
    this.effects.terminate();
    this.sub.unsubscribe();
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

  public refreshCategories() {
    loadCategories(this.store, true).pipe(take(1)).subscribe();
  }

  public productById(index: number, el: Product): number {
    return el.id;
  }

  public create() {
    this.router.navigate(["new"], {
      relativeTo: this.route,
    });
  }
}
