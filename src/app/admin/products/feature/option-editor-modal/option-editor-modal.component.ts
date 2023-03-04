import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  IonicModule,
  ModalController,
  ItemReorderCustomEvent,
} from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";
import { FormArray, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { OptionFormModel } from "../../utils";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { EditOptionDto } from "@shared/product";
import {
  ClearInputButtonComponent,
  ErrorListComponent,
} from "@shared/inputs/ui/ionic";
import { OptionInputComponent } from "../../ui";

@Component({
  selector: "app-admin-option-editor-modal",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ClearInputButtonComponent,
    ErrorListComponent,
    OptionInputComponent,
  ],
  templateUrl: "./option-editor-modal.component.html",
  styleUrls: ["./option-editor-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionEditorModalComponent implements OnInit {
  @Input()
  public bindedFormArray!: FormArray<FormGroup<OptionFormModel>>;

  public sorting$: Observable<boolean>;

  private sortingSubject: BehaviorSubject<boolean>;

  constructor(private modalController: ModalController) {
    this.sortingSubject = new BehaviorSubject<boolean>(false);
    this.sorting$ = this.sortingSubject.asObservable();
  }

  public ngOnInit(): void {
    if (!this.bindedFormArray) {
      throw new Error("bindedFormArray is required");
    }
  }

  public close() {
    this.modalController.dismiss();
  }

  public handleReorder(e: any) {
    const event = e as ItemReorderCustomEvent;
    let valueSorted = event.detail.complete(this.bindedFormArray.value);
    valueSorted = JSON.parse(JSON.stringify(valueSorted));
    // !!! IT DOESNT EMIT NGXS FORM PLUGIN STATE CHANGE!
    // The FormDirective uses distinctUntilChanged on the valueChanges observable,
    // but somehow Angular's FormArray doesn't change the reference of the array even if we supply a cloned one
    // this._formGroupDirective.valueChanges!.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))....
    // here, b should be the new value, but the previously stored a value's formarray array got changed as well
    // (due to it being a reference type) and therefore the distinctUntilChanged doesn't emit a new value
    this.bindedFormArray.setValue(valueSorted);
  }

  public toggleSorting() {
    const isSorting = !this.sortingSubject.value;
    if (isSorting) {
      this.bindedFormArray.disable();
    } else {
      this.bindedFormArray.enable();
    }

    this.sortingSubject.next(isSorting);
  }

  public addOption() {
    this.bindedFormArray.push(
      new ClassValidatorFormGroup<OptionFormModel>(EditOptionDto, {
        name: new ClassValidatorFormControl<string | null>(),
        extraCost: new ClassValidatorFormControl<number | null>(),
      }),
    );
  }

  public removeOption(index: number) {
    this.bindedFormArray.removeAt(index);
  }
}
