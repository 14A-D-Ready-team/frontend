import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, loadCategories } from "@shared/category";
import { Product } from "@shared/product";
import { User } from "@shared/user";
import {
  catchError,
  combineLatest,
  filter,
  ignoreElements,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
} from "rxjs";
import { loadBuffetById } from "@shared/buffet/utils";
import {
  LoadInitialProducts,
  LoadMoreProducts,
  MainDesktopState,
} from "./store";
import { Dictionary } from "@/types";
import { environment } from "@/environments/environment";

@Component({
  selector: "app-main-desktop",
  templateUrl: "./main-desktop.page.html",
  styleUrls: ["./main-desktop.page.scss"],
})
export class MainDesktopPage implements OnInit {
  @Select(AuthState.user)
  public activeUser$!: Observable<User>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  @Select(MainDesktopState.shownCategories)
  public categories$!: Observable<Category[]>;

  @Select(MainDesktopState.shownProducts)
  public products$!: Observable<Dictionary<Product[]>>;

  public url$!: Observable<Dictionary<string>>;

  public vm$: Observable<{
    activeBuffet: Buffet | undefined;
    activeUser: User;
    categories: Category[];
    buffetLoadResult: { loading: boolean; error?: any };
    products: Dictionary<Product[]>;
  }>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const buffet: Buffet | undefined = this.store.selectSnapshot(
      BuffetState.active,
    );
    let buffetLoadResult$: Observable<{ loading: boolean; error?: any }>;
    if (buffet) {
      buffetLoadResult$ = of({ loading: false }).pipe(shareReplay(1));
    } else {
      buffetLoadResult$ = loadBuffetById(route, store).pipe(shareReplay(1));
    }

    buffetLoadResult$
      .pipe(
        filter(result => !result.loading && !result.error),
        take(1),
        switchMap(() => loadCategories(this.store)),
        switchMap(() => this.categories$),
        take(1),
        tap(categories => {
          categories.forEach(c => {
            this.store.dispatch(new LoadInitialProducts(c.id));
          });
        }),
      )
      .subscribe();

    this.vm$ = combineLatest([
      this.activeBuffet$,
      this.activeUser$,
      this.categories$,
      this.products$,
      buffetLoadResult$,
    ]).pipe(
      map(
        ([
          activeBuffet,
          activeUser,
          categories,
          products,
          buffetLoadResult,
        ]) => ({
          activeBuffet,
          activeUser,
          categories,
          products,
          buffetLoadResult,
        }),
      ),
    );
  }

  loadMoreProducts(categoryId: number) {
    this.store.dispatch(new LoadMoreProducts(categoryId));
  }

  getImage(productId: number) {
    return environment.api.url + "/product/" + productId + "/image";
  }

  public openDetails() {
    this.router.navigate(["product"]);
  }

  ngOnInit() {}
}
