import { environment } from "@/environments/environment";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewWillEnter, ViewWillLeave } from "@ionic/angular";
import { Actions, Select, Store, ofActionDispatched } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { loadBuffetById } from "@shared/buffet/utils";
import { AddItem } from "@shared/cart/data-access";
import { Category, CategoryState } from "@shared/category";
import { loadCategoryById } from "@shared/category/utils/load-category-by-id";
import { OrderedProductDto } from "@shared/order";
import {
  Customization,
  Product,
  ProductState,
  loadProductById,
} from "@shared/product";
import { forEach, pick } from "lodash";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Key } from "readline";
import {
  Observable,
  Subscription,
  catchError,
  filter,
  map,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from "rxjs";
import { CategoriesLoaded, LoadPage, ProductPageState, Reset } from "./store";

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
export class ProductPage implements OnInit, ViewWillLeave, ViewWillEnter {
  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

  @Select(ProductPageState.loadResult)
  public loadResult$!: Observable<{
    loading: boolean;
    error?: any;
  }>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private fb: FormBuilder,
    private actions: Actions,
  ) {
    /* this.loadResult$ = route.queryParams.pipe(
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
        return loadBuffetById(buffetId, store, false).pipe(map(() => buffetId));
      }),
      switchMap(buffetId => loadCategoryById(buffetId, store)),
      filter(x => !x.loading),
      map(() => ({ loading: false })),
      catchError(error => of({ loading: false, error })),
      startWith({ loading: true }),
      shareReplay(1),
    ); */

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

  public product$: Observable<Product | undefined>;

  public category$: Observable<Category | undefined>;

  public customs: Customization[] | undefined;

  private sub?: Subscription;

  get customizations() {
    return this.customizationForm.controls.customizations as FormArray;
  }

  get amount() {
    return this.form.controls.amount.value;
  }

  ionViewWillEnter(): void {
    this.store.dispatch(new LoadPage()).subscribe();
  }

  ionViewWillLeave(): void {
    this.store.dispatch(new Reset()).subscribe();
    this.sub?.unsubscribe();
  }

  createControls() {
    const formArray = this.customizations;

    for (const custom of this.customs!) {
      const customsFormGroup = new FormGroup({});
      if (custom.optionCount === 1) {
        const checkboxGroup = new FormGroup({});
        customsFormGroup.addControl(custom.id.toString(), checkboxGroup);
        for (const option of custom.options) {
          checkboxGroup.addControl(option.id.toString(), new FormControl());
        }
      } else {
        const radio = new FormControl();
        //Alapértelmezetten első kiválasztva
        radio.setValue(custom.options[0].id);
        customsFormGroup.addControl(custom.id.toString(), radio);
      }
      formArray.push(customsFormGroup);
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
    const pId = this.form.value.productId;
    const amount = this.form.value.amount;
    const selectedOptionIds = this.form.value.selectedOptionIds;
    const product = new OrderedProductDto(pId, amount, selectedOptionIds);
    console.log(product);
    this.store.dispatch(new AddItem(product));
    this.router.navigate(["cart-mobile"]);
  }

  getImage(productId: number) {
    return environment.api.url + "/product/" + productId + "/image";
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
