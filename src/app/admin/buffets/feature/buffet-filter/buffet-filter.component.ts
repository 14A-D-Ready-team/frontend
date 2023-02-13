import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StringFilterQuery } from '@shared/api';
import { SearchBuffetsQuery } from '@shared/buffet/data-access/query';
import { StringFilterFormModel } from '@shared/inputs/utils';
import { ClassValidatorFormGroup, ClassValidatorFormControl } from 'ngx-reactive-form-class-validator';
import { BuffetFilterEffects, formPath } from './store';

@Component({
  selector: 'app-buffet-filter',
  templateUrl: './buffet-filter.component.html',
  styleUrls: ['./buffet-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuffetFilterComponent implements OnInit, OnDestroy {

  @Input()
  public order?: string;

  public formPath = formPath;

  public form = new ClassValidatorFormGroup(SearchBuffetsQuery, {
    search: new ClassValidatorFormGroup<StringFilterFormModel>(
      StringFilterQuery,
      {
        searchString: new ClassValidatorFormControl<string | null>(null),
      },
    ),
  });


  constructor(private effects: BuffetFilterEffects) {}

  public ngOnInit(): void {
    this.effects.start();
  }

  public ngOnDestroy(): void {
    this.effects.terminate();
  }

  public reset(): void {
    this.form.reset();
  }

  public descending() : void {
    if (this.order === "DESC") {
      this.order = "";
    }
    else {
      this.order = "DESC";
    }
  }

  public ascending() : void {
    if (this.order === "ASC") {
      this.order = "";
    }
    else {
      this.order = "ASC";
    }
  }

}
