import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Category } from "@shared/category";
import { NumericFilterFormModel } from "@shared/inputs/utils";
import { NumericFilterType } from "@shared/api";
import { formPath, ProductFilterEffects } from "./store";

@Component({
  selector: "app-product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  @Input()
  public categories!: Category[];

  @Output()
  public refreshCategories = new EventEmitter<void>();

  public formPath = formPath;

  public form = new FormGroup({
    categoryId: new FormControl<number | null>(null, {
      nonNullable: false,
    }),
    fullPrice: new FormGroup<NumericFilterFormModel>({
      min: new FormControl<number | null>(null, { nonNullable: false }),
      max: new FormControl<number | null>(null, { nonNullable: false }),
      value: new FormControl<number | null>(null, { nonNullable: false }),
      type: new FormControl<NumericFilterType>(NumericFilterType.Range, {
        nonNullable: true,
      }),
    }),
    discountedPrice: new FormGroup<NumericFilterFormModel>({
      min: new FormControl<number | null>(null, { nonNullable: false }),
      max: new FormControl<number | null>(null, { nonNullable: false }),
      value: new FormControl<number | null>(null, { nonNullable: false }),
      type: new FormControl<NumericFilterType>(NumericFilterType.Range, {
        nonNullable: true,
      }),
    }),
    stock: new FormGroup<NumericFilterFormModel>({
      min: new FormControl<number | null>(null, { nonNullable: false }),
      max: new FormControl<number | null>(null, { nonNullable: false }),
      value: new FormControl<number | null>(null, { nonNullable: false }),
      type: new FormControl<NumericFilterType>(NumericFilterType.Range, {
        nonNullable: true,
      }),
    }),
  });

  constructor(private effects: ProductFilterEffects) {}

  public ngOnInit(): void {
    /* this.form.valueChanges.subscribe(value => {
      console.log(value);
    }); */
    this.effects.start();
  }

  public ngOnDestroy(): void {
    this.effects.terminate();
  }

  public reset(): void {
    this.form.reset();
  }
}
