import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  Actions,
  Select,
  Store,
  ofAction,
  ofActionDispatched,
} from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { User } from "@shared/user";
import { Category, CategoryState, loadCategories } from "@shared/category";
import {
  combineLatest,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  Subscription,
  switchMap,
  take,
  tap,
} from "rxjs";
import {
  CategoriesLoaded,
  LoadMoreProducts,
  LoadPage,
  MainPageState,
  Reset,
  SelectCategory,
} from "./store";
import { ActivatedRoute } from "@angular/router";
import { Product, ProductService } from "@shared/product";
import { Dictionary } from "@/types";
import { loadBuffetById } from "@shared/buffet/utils";
import { environment } from "@/environments/environment";
import { ViewWillEnter, ViewWillLeave } from "@ionic/angular";

@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"],
})
export class MainPage implements ViewWillLeave, ViewWillEnter {
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

  @Select(MainPageState.loadResult)
  public loadResult$!: Observable<{
    loading: boolean;
    error?: any;
  }>;

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
    loadResult: { loading: boolean; error?: any };
  }>;

  private sub?: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private productService: ProductService,
    private actions: Actions,
  ) {
    this.vm$ = combineLatest([
      this.activeBuffet$,
      this.activeUser$,
      this.activeCategory$,
      this.categories$,
      this.categoriesDict$,
      this.products$,
      this.loadResult$,
    ]).pipe(
      map(
        ([
          activeBuffet,
          activeUser,
          activeCategory,
          categories,
          categoriesDict,
          products,
          loadResult,
        ]) => ({
          activeBuffet,
          activeUser,
          activeCategory,
          categories,
          categoriesDict,
          products,
          loadResult,
        }),
      ),
    );
  }

  ionViewWillEnter(): void {
    this.sub = this.actions
      .pipe(
        ofActionDispatched(CategoriesLoaded),
        tap(a => {
          this.categoryInput.nativeElement.checked = true;
          this.select(a.categories[0].id);
        }),
      )
      .subscribe();
    this.store.dispatch(new LoadPage());
  }

  ionViewWillLeave(): void {
    this.store.dispatch(new Reset());
    this.sub?.unsubscribe();
  }

  onInfinite(event: any) {
    if (
      event.target.offsetWidth + event.target.scrollLeft >=
      event.target.scrollWidth - 50
    ) {
      this.store.dispatch(new LoadMoreProducts(this.activeCategoryId));
    }
  }

  getImage(productId: number) {
    return environment.api.url + "/product/" + productId + "/image";
  }
}
