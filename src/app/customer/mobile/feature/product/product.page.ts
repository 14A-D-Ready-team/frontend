import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CustomizationFormModel, OptionFormModel } from "@app/customer/utils";
import { Select, Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, CategoryState } from "@shared/category";
import {
  Customization,
  Product,
  ProductState,
  loadProductById,
} from "@shared/product";
import { Observable, map, pluck, switchMap, takeLast, tap } from "rxjs";

@Component({
  selector: "app-product",
  templateUrl: "./product.page.html",
  styleUrls: ["./product.page.scss"],
})
export class ProductPage implements OnInit {
  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.loadResult$ = loadProductById(route, store);

    this.product$ = route.queryParams.pipe(
      switchMap(params => {
        return store.select(ProductState.entityById(params.productId));
      }),
    );

    this.category$ = this.product$.pipe(
      switchMap(p => {
        return store.select(CategoryState.entityById(p!.categoryId));
      }),
    );

    this.form = this.fb.group({ customizations: new FormArray([]) });
    // this.form = this.fb.group({ customizations: new FormArray([]) });
  }

  createControls() {
    const fA = this.customizations;

    for (const control of this.customs!) {
      const formGroup = new FormGroup({});
      for (const o of control.options) {
        formGroup.addControl(o.name, new FormControl());
      }
      fA.push(formGroup);
    }
  }

  public form: FormGroup;

  public loadResult$: Observable<{ loading: boolean; error?: any }>;

  public product$: Observable<Product | undefined>;

  public category$: Observable<Category | undefined>;

  public customs: Customization[] | undefined;

  get customizations() {
    return this.form.controls.customizations as FormArray;
  }

  click() {
    console.log(this.form);
  }

  ngOnInit() {
    this.product$.subscribe(x => {
      this.customs = x?.customizations;
    });

    this.createControls();
    console.log(this.form);
  }
}
