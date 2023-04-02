/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable no-underscore-dangle */
import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormGroupDirective,
} from "@angular/forms";
import {
  ResetForm,
  UpdateForm,
  UpdateFormDirty,
  UpdateFormErrors,
  UpdateFormStatus,
  UpdateFormValue,
} from "@ngxs/form-plugin";
import { Actions, getValue, ofActionDispatched, Store } from "@ngxs/store";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  takeUntil,
  tap,
} from "rxjs";
import { traverseControls, traverseObject } from "../utils";
import {
  FormControlErrors,
  ResetFormControlErrors,
  UpdateFormControlErrors,
} from "./store";

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: "[ngxsFormPlus]" })
export class ExtendedFormDirective implements OnInit, OnDestroy {
  @Input("ngxsFormPlus")
  path: string = null!;

  @Input("ngxsFormDebounce")
  set debounce(debounce: string | number) {
    this._debounce = Number(debounce);
  }
  get debounce() {
    return this._debounce;
  }
  private _debounce = 100;

  @Input("ngxsFormClearOnDestroy")
  set clearDestroy(val: boolean) {
    this._clearDestroy = val != null && `${val}` !== "false";
  }
  get clearDestroy(): boolean {
    return this._clearDestroy;
  }

  private _clearDestroy = false;

  @Input()
  formControlFactory?: (path: string) => AbstractControl | undefined;

  private updating = false;

  private readonly destroy$ = new Subject<void>();

  private get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  constructor(
    private actions$: Actions,
    private store: Store,
    private formGroupDirective: FormGroupDirective,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.actions$
      .pipe(
        ofActionDispatched(ResetForm),
        filter((action: ResetForm) => action.payload.path === this.path),
        takeUntil(this.destroy$),
      )
      .subscribe(({ payload: { value } }: ResetForm) => {
        this.form.reset(value);
        this.updateFormStateWithRawValue(true);
        this.updateFormStateWithErrors();
        this.cd.markForCheck();
      });

    this.getStateStream(`${this.path}.model`).subscribe(model => {
      if (this.updating || !model) {
        return;
      }
      this.updateFormArrays(model);
      this.form.patchValue(model);
      this.cd.markForCheck();
    });

    this.getStateStream(`${this.path}.dirty`).subscribe(dirty => {
      if (this.form.dirty === dirty || typeof dirty !== "boolean") {
        return;
      }

      if (dirty) {
        this.form.markAsDirty();
      } else {
        this.form.markAsPristine();
      }

      this.cd.markForCheck();
    });

    this.getStateStream(`${this.path}.formControlErrors`).subscribe(errors => {
      if (this.updating) {
        return;
      }

      const formControlErrors = (errors || {}) as FormControlErrors;
      for (const key in formControlErrors) {
        if (Object.prototype.hasOwnProperty.call(formControlErrors, key)) {
          const control = this.form.get(key);
          if (control) {
            control.setErrors(formControlErrors[key]);
          }
        }
      }
    });

    // On first state change, sync form model, status and dirty with state
    this.store
      .selectOnce(state => getValue(state, this.path))
      .subscribe(() => {
        this.store.dispatch([
          new UpdateFormValue({
            path: this.path,
            value: this.form.getRawValue(),
          }),
          new UpdateFormStatus({
            path: this.path,
            status: this.form.status,
          }),
          new UpdateFormDirty({
            path: this.path,
            dirty: this.form.dirty,
          }),
        ]);
        this.updateFormStateWithErrors();
      });

    this.getStateStream(`${this.path}.disabled`).subscribe(disabled => {
      if (this.form.disabled === disabled || typeof disabled !== "boolean") {
        return;
      }

      if (disabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }

      this.cd.markForCheck();
    });

    this.formGroupDirective
      .valueChanges!.pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        this.debounceChange(),
      )
      .subscribe(() => {
        this.updateFormStateWithRawValue();
      });

    this.formGroupDirective
      .statusChanges!.pipe(distinctUntilChanged(), this.debounceChange())
      .subscribe((status: string) => {
        this.store.dispatch(
          new UpdateFormStatus({
            status,
            path: this.path,
          }),
        );
        this.updateFormStateWithErrors();
      });
  }

  updateFormStateWithRawValue(withFormStatus?: boolean) {
    if (this.updating) return;

    const value = this.formGroupDirective.control.getRawValue();

    const actions: any[] = [
      new UpdateFormValue({
        path: this.path,
        value,
      }),
      new UpdateFormDirty({
        path: this.path,
        dirty: this.formGroupDirective.dirty,
      }),
      new UpdateFormErrors({
        path: this.path,
        errors: this.formGroupDirective.errors,
      }),
    ];

    if (withFormStatus) {
      actions.push(
        new UpdateFormStatus({
          path: this.path,
          status: this.formGroupDirective.status,
        }),
      );
    }

    this.updating = true;
    this.store.dispatch(actions).subscribe({
      error: () => (this.updating = false),
      complete: () => (this.updating = false),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.clearDestroy) {
      this.store.dispatch(
        new UpdateForm({
          path: this.path,
          value: null,
          dirty: null,
          status: null,
          errors: null,
        }),
      );
    }

    if (this.clearDestroy) {
      this.store.dispatch(new ResetFormControlErrors({ path: this.path }));
    }
  }

  private updateFormStateWithErrors() {
    if (this.updating) return;

    const actions: UpdateFormControlErrors[] = [];

    for (const controlName in this.form.controls) {
      if (this.form.controls.hasOwnProperty(controlName)) {
        const control = this.form.controls[controlName];
        const validationErrors = control.errors || {};

        actions.push(
          new UpdateFormControlErrors({
            path: this.path,
            controlName,
            errors: validationErrors,
            replace: true,
          }),
        );
      }
    }

    this.updating = true;
    this.store.dispatch(actions).subscribe({
      error: () => (this.updating = false),
      complete: () => (this.updating = false),
    });
  }

  private updateFormArrays(model: any) {
    if (!this.formControlFactory) {
      return;
    }

    traverseObject(model, (value, path) => {
      if (!Array.isArray(value)) {
        return;
      }
      const formArray = this.form.get(path);
      if (!(formArray instanceof FormArray)) {
        return;
      }

      const diff = value.length - formArray.controls.length;
      for (let i = 0; i < diff; i++) {
        const createdControl = this.formControlFactory!(path);
        if (createdControl) {
          formArray.push(createdControl);
        }
      }
    });
  }

  private debounceChange() {
    const skipDebounceTime =
      this.formGroupDirective.control.updateOn !== "change" ||
      this._debounce < 0;

    return skipDebounceTime
      ? (change: Observable<any>) => change.pipe(takeUntil(this.destroy$))
      : (change: Observable<any>) =>
          change.pipe(debounceTime(this._debounce), takeUntil(this.destroy$));
  }

  private getStateStream(path: string) {
    return this.store
      .select(state => getValue(state, path))
      .pipe(takeUntil(this.destroy$));
  }
}
