import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { User } from "@shared/user";
import { Category, CategoryState, loadCategories } from "@shared/category";
import {
  catchError,
  combineLatest,
  ignoreElements,
  map,
  Observable,
  of,
  startWith,
} from "rxjs";
import { LoadMoreProducts, MainPageState, SelectCategory } from "./store";
import { ActivatedRoute } from "@angular/router";
import { IdStrategy, SetActive } from "@ngxs-labs/entity-state";
import { Product, ProductService, ProductState } from "@shared/product";
@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"],
})
export class MainPage implements OnInit {
  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  @Select(AuthState.user)
  public activeUser$!: Observable<User>;

  @Select(CategoryState.active)
  public activeCategory$!: Observable<Category>;

  @Select(MainPageState.shownCategories)
  public categories$!: Observable<Category[]>;

  @Select(MainPageState.shownProducts)
  public products$!: Observable<Product[]>;

  public select(id: number) {
    const idString = id.toString();
    this.store.dispatch(new SelectCategory(idString));
    this.store.dispatch(new LoadMoreProducts(idString));
  }

  public vm$: Observable<{
    activeBuffet: Buffet | undefined;
    activeUser: User;
    activeCategory: Category;
    categories: Category[];
    products: Product[];
    buffetLoading: boolean;
    resolverError: any;
  }>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    const buffetLoading$ = route.data.pipe(
      map(() => false),
      startWith(true),
    );
    const resolverError$ = route.data.pipe(
      ignoreElements(),
      startWith(undefined),
      catchError(err => of(err)),
    );

    this.vm$ = combineLatest([
      this.activeBuffet$,
      this.activeUser$,
      this.activeCategory$,
      this.categories$,
      this.products$,
      buffetLoading$,
      resolverError$,
    ]).pipe(
      map(
        ([
          activeBuffet,
          activeUser,
          activeCategory,
          categories,
          products,
          buffetLoading,
          resolverError,
        ]) => ({
          activeBuffet,
          activeUser,
          activeCategory,
          categories,
          products,
          buffetLoading,
          resolverError,
        }),
      ),
    );
  }

  ngOnInit() {
    loadCategories(this.store).subscribe();
  }
}
