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
  selector: "app-option-editor-modal",
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
