import { Dictionary } from "@/types";
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Category, CategoryState } from "@shared/category";
import {
  Customization,
  Option,
  OptionCount,
  Product,
  ProductState,
} from "@app/shared/product";
import {
  InfiniteScrollCustomEvent,
  Platform,
  RefresherCustomEvent,
} from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { combineLatest, map, Observable, switchMap, take, tap } from "rxjs";
import {
  LoadMore,
  LoadPage,
  ProductsListEffects,
  ProductsListState,
  Reload,
  RetryLoading,
} from "./store";
import { KeyValue } from "@angular/common";

@Component({
  selector: "app-buffets-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListPage implements OnInit, OnDestroy {
  @Select(ProductsListState.shownProducts)
  public products$!: Observable<Product[]>;

  @Select(CategoryState.entitiesMap)
  public categories$!: Observable<Dictionary<Category>>;

  @Select(ProductState.loading)
  public loading$!: Observable<boolean>;

  @Select(CategoryState.loading)
  public categoriesLoading$!: Observable<boolean>;

  @Select(ProductState.error)
  public error$!: Observable<any>;

  public vm$ = combineLatest([
    this.products$,
    this.categories$,
    this.loading$,
    this.error$,
  ]).pipe(
    map(([products, categories, loading, error]) => ({
      products,
      categories,
      loading,
      error,
    })),
  );

  constructor(private store: Store, private effects: ProductsListEffects) {}

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

  public productById(index: number, el: Product): number {
    return el.id;
  }

  public extractValue(keyValuePair: KeyValue<string, Category>) {
    return keyValuePair.value;
  }
}
