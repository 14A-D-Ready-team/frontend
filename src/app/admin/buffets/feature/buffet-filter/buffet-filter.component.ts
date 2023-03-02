import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { StringFilterQuery } from "@shared/api";
import { SearchBuffetsQuery } from "@shared/buffet/data-access/query";
import { StringFilterFormModel } from "@shared/inputs/utils";
import {
  ClassValidatorFormGroup,
  ClassValidatorFormControl,
} from "ngx-reactive-form-class-validator";
import { BuffetFilterEffects, formPath } from "./store";

@Component({
  selector: "app-buffet-filter",
  templateUrl: "./buffet-filter.component.html",
  styleUrls: ["./buffet-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuffetFilterComponent implements OnInit, OnDestroy {
  public formPath = formPath;

  public form = new ClassValidatorFormGroup(SearchBuffetsQuery, {
    //INVALID
    //orderByField: new ClassValidatorFormControl<string | null>(null),
    order: new ClassValidatorFormControl<string | null>("ASC"),
    search: new ClassValidatorFormGroup<StringFilterFormModel>(
      StringFilterQuery,
      {
        searchString: new ClassValidatorFormControl<string | null>(null),
      },
    ),
  });

  constructor(private effects: BuffetFilterEffects) {
    // this.form.valueChanges.subscribe(value =>
    //   console.log(this.form));
  }

  public ngOnInit(): void {
    //this.form.controls.orderByField.setValue("name");
    this.effects.start();
  }

  public ngOnDestroy(): void {
    this.effects.terminate();
  }

  public reset(): void {
    this.form.reset();
  }
}
