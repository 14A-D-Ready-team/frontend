import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, CategoryState } from "@shared/category";
import { OrderedProductDto } from "@shared/order";
import {
  Customization,
  Product,
  ProductState,
  loadProductById,
} from "@shared/product";
import { isObject } from "lodash";
import {
  ClassValidatorFormArray,
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Observable, switchMap } from "rxjs";

interface ProductForm {
  productId: FormControl<number>;
  amount: FormControl<number>;
  selectedOptionIds: FormArray<FormGroup>;
}

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

    this.product$.subscribe(x => {
      this.customs = x?.customizations;
    });

    this.form = new ClassValidatorFormGroup<ProductForm>(OrderedProductDto, {
      productId: new ClassValidatorFormControl<number>(0),
      amount: new ClassValidatorFormControl<number>(1),
      selectedOptionIds: new FormArray<FormGroup>([]),
    });
  }

  createControls(): FormArray<FormGroup> {
    const fA = new FormArray<FormGroup>([]);
    for (let c of this.customs!) {
      const fG = new FormGroup({});
      for (let o of c.options) {
        fG.addControl(o.id.toString(), new FormControl());
      }
      fA.push(fG);
    }

    return fA;
  }

  public form!: ClassValidatorFormGroup;

  public loadResult$: Observable<{ loading: boolean; error?: any }>;

  public product$: Observable<Product | undefined>;

  public category$: Observable<Category | undefined>;

  public customs: Customization[] | undefined;

  get customizations() {
    return this.form.controls.selectedOptionIds as FormArray;
  }

  click() {
    this.form = new ClassValidatorFormGroup<ProductForm>(OrderedProductDto, {
      productId: new ClassValidatorFormControl<number>(0),
      amount: new ClassValidatorFormControl<number>(1),
      selectedOptionIds: this.createControls(),
    });

    console.log(this.customs);

    console.log(this.form);
  }

  ngOnInit() {}
}
