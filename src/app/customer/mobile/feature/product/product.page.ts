import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { loadBuffetById, loadBuffetByRoute } from "@shared/buffet/utils";
import { Category, CategoryState } from "@shared/category";
import { loadCategoryById } from "@shared/category/utils/load-category-by-id";
import { OrderedProductDto } from "@shared/order";
import {
  Customization,
  Product,
  ProductState,
  loadProductById,
} from "@shared/product";
import { forEach } from "lodash";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Key } from "readline";
import {
  Observable,
  catchError,
  filter,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from "rxjs";
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
    this.loadResult$ = route.queryParams.pipe(
      switchMap(params => {
        const id = params.productId;
        const product: Product | undefined = store.selectSnapshot(
          ProductState.entityById(id),
        );
        if (!product) {
          return loadProductById(id, store).pipe(
            filter(x => !x.loading),
            map(() => id),
          );
        }
        return of(id);
      }),
      switchMap(id => store.selectOnce(ProductState.entityById(id))),
      switchMap(product => {
        const buffetId = product.buffetId;
        return loadBuffetById(buffetId, store, false).pipe(
          filter(x => !x.loading),
          map(() => buffetId),
        );
      }),
      switchMap(buffetId => loadCategoryById(buffetId, store)),
      filter(x => !x.loading),
      map(() => ({ loading: false })),
      catchError(error => of({ loading: false, error })),
      startWith({ loading: true }),
      shareReplay(1),
    );
    this.loadResult$.subscribe();

    this.product$ = route.queryParams.pipe(
      switchMap(params => {
        return store.select(ProductState.entityById(params.productId));
      }),
      filter(x => !!x),
    );

    this.category$ = this.product$.pipe(
      switchMap(p => {
        return store.select(CategoryState.entityById(p!.categoryId));
      }),
      filter(x => !!x),
    );

    this.customizationForm = this.fb.group({
      customizations: this.fb.array([]),
    });

    this.form = new ClassValidatorFormGroup<ProductForm>(OrderedProductDto, {
      productId: new ClassValidatorFormControl<number>(0),
      amount: new ClassValidatorFormControl<number>(1),
      selectedOptionIds: new ClassValidatorFormControl<number[]>(),
    });

    this.addCustomizationToFrom();

    this.calculateExtraPrice();
  }

  public customizationForm: FormGroup;

  public form: ClassValidatorFormGroup;

  public extraPrice = 0;

  public loadResult$: Observable<{ loading: boolean; error?: any }>;

  public product$: Observable<Product | undefined>;

  public category$: Observable<Category | undefined>;

  public customs: Customization[] | undefined;

  get customizations() {
    return this.customizationForm.controls.customizations as FormArray;
  }

  get amount() {
    return this.form.controls.amount.value;
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
        const fC = new FormControl();
        fC.setValue(control.options[0].id);
        formGroup.addControl(control.id.toString(), fC);
      }

      fA.push(formGroup);
    }
  }

  addCustomizationToFrom() {
    this.customizationForm.valueChanges.subscribe(c => {
      const customizationIds: number[] = [];
      c.customizations.forEach((customization: object) => {
        Object.values(customization).forEach(option => {
          if (option) {
            if (typeof option === "object") {
              Object.keys(option)
                .filter(v => option[v])
                .forEach(o => {
                  customizationIds.push(+o);
                });
            } else {
              const value = option;
              customizationIds.push(value);
            }
          }
        });
      });
      this.form.controls.selectedOptionIds.setValue(customizationIds);
      console.log(this.form);
    });
  }

  calculateExtraPrice() {
    this.customizationForm.valueChanges.subscribe(c => {
      let cost = 0;
      this.customs?.forEach(x => {
        x.options.forEach(o => {
          if (
            (this.form.controls.selectedOptionIds.value as number[]).includes(
              o.id,
            )
          ) {
            cost += o.extraCost;
          }
        });
      });
      this.extraPrice = cost;
    });
  }

  changeAmount(addAmount: boolean) {
    const value = this.form.controls.amount.value;
    let stock: number | undefined = 1;
    this.product$.subscribe(x => {
      stock = x?.stock;
    });

    if (addAmount) {
      if (value < stock && value < 3) {
        const biggerValue = value + 1;
        this.form.controls.amount.setValue(biggerValue);
      }
    } else {
      if (value > 1) {
        const lowerValue = value - 1;
        this.form.controls.amount.setValue(lowerValue);
      }
    }
  }

  addProductToCart() {
    console.log(this.form);
  }

  ngOnInit() {
    this.product$.pipe(filter((x): x is Product => !!x)).subscribe(x => {
      this.customs = x?.customizations;
      this.form.patchValue({ productId: x.id });
      this.createControls();
    });

    console.log(this.form);
  }
}
