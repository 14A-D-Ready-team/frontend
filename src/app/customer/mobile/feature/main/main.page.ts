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
import { MainPageState } from "./store";
import { ActivatedRoute } from "@angular/router";
import { SetActive } from "@ngxs-labs/entity-state";
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

  @Select(MainPageState.shownCategories)
  public categories$!: Observable<Category[]>;

  public select(id: number) {
    const idString = id.toString();
    this.store.dispatch(new SetActive(CategoryState, idString));
  }

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
