import { Component, OnInit, ViewChild, Input, ElementRef } from "@angular/core";
import { Select, Store, StateContext } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { Buffet, BuffetActions, BuffetState } from "@shared/buffet";
import { User } from "@shared/user";
import { Category, CategoryState, loadCategories } from "@shared/category";
import {
  catchError,
  combineLatest,
  empty,
  ignoreElements,
  map,
  Observable,
  of,
  startWith,
  switchMap,
} from "rxjs";
import {
  LoadMoreProducts,
  MainPageState,
  MainPageStateModel,
  SelectCategory,
  UnloadProducts,
} from "./store";
import { ActivatedRoute } from "@angular/router";
import { IdStrategy, SetActive } from "@ngxs-labs/entity-state";
import { Product, ProductService, ProductState } from "@shared/product";
import { LoadMore } from "@app/customer/feature";
import { take } from "lodash";
import { InfiniteScrollCustomEvent } from "@ionic/angular";
import { Dictionary } from "@/types";
import { loadBuffetById } from "@shared/buffet/utils";
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

  @Select(MainPageState.shownCategoriesDict)
  public categoriesDict$!: Observable<Dictionary<Category>>;

  @Select(MainPageState.shownProducts)
  public products$!: Observable<Product[]>;

  @ViewChild("categoryInput")
  categoryInput!: ElementRef<HTMLInputElement>;

  activeCategoryId = "";

  public select(id: number) {
    //this.store.dispatch(new UnloadProducts());
    this.activeCategoryId = id.toString();
    this.store.dispatch(new SelectCategory(this.activeCategoryId));
  }

  public vm$: Observable<{
    activeBuffet: Buffet | undefined;
    activeUser: User;
    activeCategory: Category;
    categories: Category[];
    categoriesDict: Dictionary<Category>;
    products: Product[];
    buffetLoadResult: { loading: boolean; error?: any };
  }>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {
    const buffetLoadResult$ = loadBuffetById(route, store);

    this.vm$ = combineLatest([
      this.activeBuffet$,
      this.activeUser$,
      this.activeCategory$,
      this.categories$,
      this.categoriesDict$,
      this.products$,
      buffetLoadResult$,
    ]).pipe(
      map(
        ([
          activeBuffet,
          activeUser,
          activeCategory,
          categories,
          categoriesDict,
          products,
          buffetLoadResult,
        ]) => ({
          activeBuffet,
          activeUser,
          activeCategory,
          categories,
          categoriesDict,
          products,
          buffetLoadResult,
        }),
      ),
    );
  }

  onInfinite(event: any) {
    if (
      event.target.offsetWidth + event.target.scrollLeft >=
      event.target.scrollWidth - 50
    ) {
      this.store.dispatch(new LoadMoreProducts(this.activeCategoryId));
    }
  }

  ngOnInit() {
    loadCategories(this.store).subscribe(() => {
      this.categoryInput.nativeElement.checked = true;
      this.select(1);
    });
  }
}
