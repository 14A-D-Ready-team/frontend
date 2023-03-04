import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Category } from "@shared/category";
import { NumericFilterFormModel } from "@shared/inputs/utils";
import { NumberFilterQuery, NumericFilterType } from "@shared/api";
import { formPath, ProductFilterEffects } from "./store";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { FilterProductsQuery } from "@shared/product";

@Component({
  selector: "app-admin-product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  @Input()
  public categories!: Category[];

  @Input()
  public categoriesLoading = false;

  @Output()
  public refreshCategories = new EventEmitter<void>();

  public formPath = formPath;

  public form = new ClassValidatorFormGroup(FilterProductsQuery, {
    categoryId: new FormControl<number | null>(null),
    fullPrice: new ClassValidatorFormGroup<NumericFilterFormModel>(
      NumberFilterQuery,
      {
        min: new ClassValidatorFormControl<number | null>(null),
        max: new ClassValidatorFormControl<number | null>(null),
        value: new ClassValidatorFormControl<number | null>(null),
        type: new FormControl<NumericFilterType>(NumericFilterType.Range, {
          nonNullable: true,
        }),
      },
    ),
    discountedPrice: new ClassValidatorFormGroup<NumericFilterFormModel>(
      NumberFilterQuery,
      {
        min: new ClassValidatorFormControl<number | null>(null),
        max: new ClassValidatorFormControl<number | null>(null),
        value: new ClassValidatorFormControl<number | null>(null),
        type: new FormControl<NumericFilterType>(NumericFilterType.Range, {
          nonNullable: true,
        }),
      },
    ),
    stock: new ClassValidatorFormGroup<NumericFilterFormModel>(
      NumberFilterQuery,
      {
        min: new ClassValidatorFormControl<number | null>(null),
        max: new ClassValidatorFormControl<number | null>(null),
        value: new ClassValidatorFormControl<number | null>(null),
        type: new FormControl<NumericFilterType>(NumericFilterType.Range, {
          nonNullable: true,
        }),
      },
    ),
  });

  constructor(private effects: ProductFilterEffects) {}

  public ngOnInit(): void {
    this.effects.start();
  }

  public ngOnDestroy(): void {
    this.effects.terminate();
  }

  public reset(): void {
    this.form.reset();
  }
}
