import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Category } from "@app/shared/category";
import {
  Customization,
  Option,
  OptionCount,
  Product,
} from "@app/shared/product";
import { InfiniteScrollCustomEvent, Platform } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { map, Observable, switchMap, take } from "rxjs";
import { LoadMore, ProductsListEffects, ProductsListState } from "./store";

@Component({
  selector: "app-buffets-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListPage implements OnInit, OnDestroy {
  @Select(ProductsListState.shownProducts)
  public products$!: Observable<Product[]>;

  constructor(private store: Store, private effects: ProductsListEffects) {}

  public ngOnInit(): void {
    //this.effects.onStart();
  }

  public ngOnDestroy(): void {
    this.effects.onTerminate();
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
}
