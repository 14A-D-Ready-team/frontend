import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Select, Store, ofActionDispatched } from "@ngxs/store";
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
  Subscription,
  switchMap,
  take,
  tap,
} from "rxjs";
import {
  LoadInitialProducts,
  LoadMoreProducts,
  LoadPage,
  MainDesktopState,
  Reset,
} from "./store";
import { Dictionary } from "@/types";
import { environment } from "@/environments/environment";
import { ViewWillEnter, ViewWillLeave } from "@ionic/angular";

@Component({
  selector: "app-main-desktop",
  templateUrl: "./main-desktop.page.html",
  styleUrls: ["./main-desktop.page.scss"],
})
export class MainDesktopPage implements OnInit, ViewWillLeave, ViewWillEnter {
  @Select(AuthState.user)
  public activeUser$!: Observable<User>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  @Select(MainDesktopState.shownCategories)
  public categories$!: Observable<Category[]>;

  @Select(MainDesktopState.shownProducts)
  public products$!: Observable<Dictionary<Product[]>>;

  @Select(MainDesktopState.loadResult)
  public loadResult$!: Observable<{
    loading: boolean;
    error?: any;
  }>;

  public url$!: Observable<Dictionary<string>>;

  private sub?: Subscription;

  public vm$: Observable<{
    activeBuffet: Buffet | undefined;
    activeUser: User;
    categories: Category[];
    loadResult: { loading: boolean; error?: any };
    products: Dictionary<Product[]>;
  }>;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.vm$ = combineLatest([
      this.activeBuffet$,
      this.activeUser$,
      this.categories$,
      this.products$,
      this.loadResult$,
    ]).pipe(
      map(([activeBuffet, activeUser, categories, products, loadResult]) => ({
        activeBuffet,
        activeUser,
        categories,
        products,
        loadResult,
      })),
    );
  }

  ionViewWillEnter(): void {
    this.store.dispatch(new LoadPage()).subscribe();
  }

  ionViewWillLeave(): void {
    this.store.dispatch(new Reset()).subscribe();
    this.sub?.unsubscribe();
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
