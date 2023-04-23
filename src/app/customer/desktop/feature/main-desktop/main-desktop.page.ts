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

  constructor(private store: Store, private route: ActivatedRoute) {
    const buffet: Buffet | undefined = this.store.selectSnapshot(
      BuffetState.active,
    );
    let buffetLoadResult$: Observable<{ loading: boolean; error?: any }>;
    if (buffet) {
      buffetLoadResult$ = of({ loading: false });
    } else {
      buffetLoadResult$ = loadBuffetById(route, store);
    }

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
