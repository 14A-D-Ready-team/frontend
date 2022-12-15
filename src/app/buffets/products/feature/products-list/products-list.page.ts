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
import { Store } from "@ngxs/store";
import { map, Observable, switchMap } from "rxjs";
import { LoadMore, ProductsListEffects } from "./store";

@Component({
  selector: "app-buffets-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListPage implements OnInit, OnDestroy {
  public products: Product[] = [
    this.createProduct(1),
    this.createProduct(2),
    this.createProduct(3),
    this.createProduct(4),
    this.createProduct(5),
    this.createProduct(6),
    this.createProduct(7),
  ];
  public category = new Category(1, "Category 1");

  constructor(private store: Store, private effects: ProductsListEffects) {}

  public ngOnInit(): void {
    //this.effects.onStart();
  }

  public ngOnDestroy(): void {
    this.effects.onTerminate();
  }

  public onIonInfinite(event: any) {
    (event as InfiniteScrollCustomEvent).target.complete();
    this.store.dispatch(new LoadMore());
  }

  public productById(index: number, el: Product): number {
    return el.id;
  }

  private createProduct(id: number): Product {
    const customizations = [
      new Customization(1, "Customization 1", OptionCount.MultipleChoice, [
        new Option(1, "Option 1", 0),
        new Option(2, "Option 2", 100),
        new Option(3, "Option 3", 200),
      ]),
      new Customization(2, "Customization 2", OptionCount.SingleChoice, [
        new Option(4, "Option 1", 0),
        new Option(5, "Option 2", 100),
        new Option(6, "Option 3", 200),
        new Option(7, "Option 4", 900),
      ]),
      new Customization(3, "Customization 3", OptionCount.MultipleChoice, [
        new Option(8, "Option 1", 200),
        new Option(9, "Option 2", 200),
      ]),
    ];

    return new Product(
      id,
      "Product " + id,
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit voluptate itaque tenetur optio, rerum nostrum aliquam asperiores veritatis, voluptates deserunt a enim voluptatibus possimus, corrupti explicabo quam illum laudantium. Eos expedita neque rerum eum magnam quisquam voluptates, ab voluptatem nemo laboriosam officiis qui! Fugit voluptatibus iure dignissimos omnis pariatur quam minima fugiat blanditiis ad odit veritatis totam et commodi ipsam, repudiandae ex ipsum quae sed molestiae assumenda odio consectetur. Deserunt soluta aliquid autem perspiciatis nisi temporibus distinctio a sit ea, unde quas ipsa porro eveniet totam itaque natus esse accusantium praesentium minus obcaecati earum ad, molestiae beatae quam. Repudiandae, iste.",
      10,
      5,
      50,
      customizations,
    );
  }
}
