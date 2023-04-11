import { Dictionary } from "@/types";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Category, CategoryState, loadCategories } from "@shared/category";
import { Product, ProductActions, ProductState } from "@app/shared/product";
import {
  ActionSheetController,
  InfiniteScrollCustomEvent,
  ModalController,
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
import { Mixin } from "ts-mixer";
import { DeleteConfirmMixin } from "@shared/modals";
import { TargetedRequestStatus } from "@shared/extended-entity-state";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.page.html",
  styleUrls: ["./product-list.page.scss"],
})
export class ProductListPage
  extends Mixin(DeleteConfirmMixin)
  implements OnInit, OnDestroy
{
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

  @Select(ProductState.deleteStatus)
  public deleteStatus$!: Observable<TargetedRequestStatus | undefined>;

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
    this.deleteStatus$,
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
        deleteStatus,
      ]) => ({
        products,
        categories,
        categoriesMap: categories && groupBy(categories, "id"),
        loading,
        categoriesLoading: categoriesLoading || false,
        error,
        typing,
        isDesktop,
        categoryError,
        noBuffetSelected: categoryError instanceof NoBuffetSelectedException,
        deleteStatus,
      }),
    ),
  );

  private sub: Subscription;

  constructor(
    private store: Store,
    private effects: ProductListEffects,
    protected platform: Platform,
    protected actionSheetController: ActionSheetController,
    protected modalController: ModalController,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    super();
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

  public async delete(product: Product) {
    if (!(await this.confirmDelete(`${product.name} terméket?`))) {
      return;
    }
    this.store.dispatch(new ProductActions.Delete(product.id));
  }
}
