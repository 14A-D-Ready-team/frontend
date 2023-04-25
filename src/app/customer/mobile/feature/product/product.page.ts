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
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Observable, switchMap } from "rxjs";
interface ProductForm {
  productId: FormControl<number>;
  amount: FormControl<number>;
  selectedOptionIds: FormControl<number[]>;
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

    this.customizationForm = this.fb.group({
      customizations: this.fb.array([]),
    });

    this.form = new ClassValidatorFormGroup<ProductForm>(OrderedProductDto, {
      productId: new ClassValidatorFormControl<number>(0),
      amount: new ClassValidatorFormControl<number>(1),
      selectedOptionIds: new ClassValidatorFormControl<number[]>(),
    });
  }

  createControls() {
    const fA = this.customizations;

    for (const control of this.customs!) {
      const formGroup = new FormGroup({});
      if (control.optionCount === 1) {
        const fG = new FormGroup({});
        formGroup.addControl(control.id.toString(), fG);
        for (const o of control.options) {
          fG.addControl(o.id.toString(), new FormControl());
        }
      } else {
        formGroup.addControl(control.id.toString(), new FormControl());
      }

      fA.push(formGroup);
    }
  }

  public customizationForm: FormGroup;

  public form: ClassValidatorFormGroup;

  public loadResult$: Observable<{ loading: boolean; error?: any }>;

  public product$: Observable<Product | undefined>;

  public category$: Observable<Category | undefined>;

  public customs: Customization[] | undefined;

  get customizations() {
    return this.customizationForm.controls.customizations as FormArray;
  }

  click() {
    console.log(this.customizationForm);
  }

  ngOnInit() {
    this.product$.subscribe(x => {
      this.customs = x?.customizations;
    });

    this.createControls();
    console.log(this.form);
  }
}
