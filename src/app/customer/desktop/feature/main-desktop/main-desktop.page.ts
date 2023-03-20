import { Component, OnDestroy, OnInit } from "@angular/core";
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
import { MainDesktopState } from "./store";

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
  public products$!: Observable<Product[]>;

  public vm$: Observable<{
    activeBuffet: Buffet | undefined;
    activeUser: User;
    categories: Category[];
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
      buffetLoading$,
      resolverError$,
    ]).pipe(
      map(
        ([
          activeBuffet,
          activeUser,
          categories,
          buffetLoading,
          resolverError,
        ]) => ({
          activeBuffet,
          activeUser,
          categories,
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
