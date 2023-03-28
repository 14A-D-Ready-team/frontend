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
import { FormArray, FormGroup, FormGroupDirective } from "@angular/forms";
import { ResetForm } from "@ngxs/form-plugin";
import { Actions, getValue, ofActionDispatched, Store } from "@ngxs/store";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  takeUntil,
} from "rxjs";
import { traverseControls } from "../utils";
import {
  FormControlErrors,
  ResetFormControlErrors,
  UpdateFormControlErrors,
} from "./store";

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: "[ngxsForm]" })
export class ExtendedFormDirective implements OnInit, OnDestroy {
  @Input("ngxsForm")
  public path: string = null!;

  @Input("ngxsFormDebounce")
  public debounce = 100;

  @Input("ngxsFormClearOnDestroy")
  public set clearDestroy(val: boolean) {
    this._clearDestroy = val != null && `${val}` !== "false";
  }

  public get clearDestroy(): boolean {
    return this._clearDestroy;
  }

  private updating = false;

  private readonly destroy$ = new Subject<void>();

  _clearDestroy = false;

  private get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  constructor(
    private actions$: Actions,
    private store: Store,
    private formGroupDirective: FormGroupDirective,
    private cd: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.actions$
      .pipe(
        ofActionDispatched(ResetForm),
        filter((action: ResetForm) => action.payload.path === this.path),
        takeUntil(this.destroy$),
      )
      .subscribe(({ payload: { value } }: ResetForm) => {
        this.form.reset(value);
        this.updateFormStateWithErrors();
        this.cd.markForCheck();
      });

    this.store
      .selectOnce(state => getValue(state, this.path))
      .subscribe(() => this.updateFormStateWithErrors());

    this.store
      .selectOnce(state => getValue(state, this.path + ".model"))
      .subscribe(val => this.updateFormArrays(val));

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

      this.cd.markForCheck();
    });

    this.getStateStream(`${this.path}.model`).subscribe(val =>
      this.updateFormArrays(val),
    );

    this.formGroupDirective
      .valueChanges!.pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        this.debounceChange(),
      )
      .subscribe(() => {
        this.updateFormStateWithErrors();
      });
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

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
    traverseControls(this.form, "", (control, path) => {
      if (control instanceof FormArray) {
        console.log(control);
        console.log(getValue(model, path));
        console.log("....");
      }
    });

    this.cd.markForCheck();
  }

  private debounceChange() {
    const skipDebounceTime =
      this.formGroupDirective.control.updateOn !== "change" ||
      this.debounce < 0;

    return skipDebounceTime
      ? (change: Observable<any>) => change.pipe(takeUntil(this.destroy$))
      : (change: Observable<any>) =>
          change.pipe(debounceTime(this.debounce), takeUntil(this.destroy$));
  }

  private getStateStream(path: string) {
    return this.store
      .select(state => getValue(state, path))
      .pipe(takeUntil(this.destroy$));
  }
}
