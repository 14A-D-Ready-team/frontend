import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, loadCategories } from "@shared/category";
import { Product } from "@shared/product";
import { User } from "@shared/user";
import {
  catchError,
  combineLatest,
  ignoreElements,
  map,
  Observable,
  of,
  startWith,
} from "rxjs";
import {
  LoadInitialProducts,
  LoadMoreProducts,
  MainDesktopState,
} from "./store";
import { Dictionary } from "@/types";

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

  public vm$: Observable<{
    activeBuffet: Buffet | undefined;
    activeUser: User;
    categories: Category[];
    products: Dictionary<Product[]>;
    buffetLoading: boolean;
    resolverError: any;
  }>;

  constructor(private store: Store, private route: ActivatedRoute) {
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
      this.categories$,
      this.products$,
      buffetLoading$,
      resolverError$,
    ]).pipe(
      map(
        ([
          activeBuffet,
          activeUser,
          categories,
          products,
          buffetLoading,
          resolverError,
        ]) => ({
          activeBuffet,
          activeUser,
          categories,
          products,
          buffetLoading,
          resolverError,
        }),
      ),
    );
  }

  loadMoreProducts(categoryId: number) {
    this.store.dispatch(new LoadMoreProducts(categoryId));
  }

  ngOnInit() {
    console.clear();
    loadCategories(this.store).subscribe();

    this.categories$.subscribe(category =>
      category.forEach(c => {
        this.store.dispatch(new LoadInitialProducts(c.id));
      }),
    );
  }
}
