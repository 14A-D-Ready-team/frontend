import { Dictionary } from "@/types";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Category, CategoryState, loadAllCategories } from "@shared/category";
import { Product, ProductState } from "@app/shared/product";
import {
  InfiniteScrollCustomEvent,
  Platform,
  RefresherCustomEvent,
} from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { combineLatest, map, Observable, startWith, take } from "rxjs";
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

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.page.html",
  styleUrls: ["./product-list.page.scss"],
})
export class ProductListPage implements OnInit, OnDestroy {
  @Select(ProductListState.shownProducts)
  public products$!: Observable<Product[]>;

  @Select(CategoryState.entitiesMap)
  public categories$!: Observable<Dictionary<Category>>;

  @Select(ProductState.loading)
  public loading$!: Observable<boolean>;

  @Select(CategoryState.loading)
  public categoriesLoading$!: Observable<boolean>;

  @Select(ProductState.error)
  public error$!: Observable<any>;

  @Select(ProductFilterState.typing)
  public typing$!: Observable<boolean>;

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
      ]) => ({
        products,
        categories,
        loading,
        categoriesLoading,
        error,
        typing,
        isDesktop,
      }),
    ),
  );

  constructor(
    private store: Store,
    private effects: ProductListEffects,
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

  public refreshCategories() {
    loadAllCategories(this.store, true).pipe(take(1)).subscribe();
  }

  public productById(index: number, el: Product): number {
    return el.id;
  }

  public extractValue(keyValuePair: KeyValue<string, Category>) {
    return keyValuePair.value;
  }

  public async editProduct(product: Product) {
    /* const modal = await this.modalController.create({
      component: ProductEditorModalComponent,
      componentProps: {
        mode: "edit",
      },
    }); */
    // await modal.present();
    this.router.navigate(["edit"], {
      queryParams: { id: product.id },
      relativeTo: this.route,
    });
  }

  public create() {
    this.router.navigate(["new"], {
      relativeTo: this.route,
    });
  }
}
