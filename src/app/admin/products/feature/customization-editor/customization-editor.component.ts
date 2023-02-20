import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  IonAccordionGroup,
  IonicModule,
  ItemReorderCustomEvent,
  ModalController,
} from "@ionic/angular";
import { OptionEditorModalComponent } from "../option-editor-modal";
import { FormArray, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CustomizationFormModel, OptionFormModel } from "../../utils";
import {
  ClassValidatorFormArray,
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { EditCustomizationDto, OptionCount } from "@shared/product";
import {
  ClearInputButtonComponent,
  ErrorListComponent,
} from "@shared/inputs/ui/ionic";
import { CustomizationInputComponent } from "../../ui";

@Component({
  selector: "app-customization-editor",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ClearInputButtonComponent,
    ErrorListComponent,
    CustomizationInputComponent,
  ],
  templateUrl: "./customization-editor.component.html",
  styleUrls: ["./customization-editor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationEditorComponent implements OnInit {
  @Input()
  public bindedFormArray!: FormArray<FormGroup<CustomizationFormModel>>;

  @ViewChild("accordionGroup", { static: true })
  public accordionGroup!: IonAccordionGroup;

  constructor(private modalControl: ModalController) {}

  public ngOnInit(): void {
    if (!this.bindedFormArray) {
      throw new Error("bindedFormArray is required");
    }
  }

  public handleReorder(e: any) {
    const event = e as ItemReorderCustomEvent;
    let valueSorted = event.detail.complete(this.bindedFormArray.value);
    valueSorted = JSON.parse(JSON.stringify(valueSorted));
    // !!!! IT DOESNT EMIT NGXS FORM PLUGIN STATE CHANGE
    this.bindedFormArray.setValue(valueSorted);
  }

  public async openOptionEditor(
    options: FormArray<FormGroup<OptionFormModel>>,
  ) {
    const modal = await this.modalControl.create({
      component: OptionEditorModalComponent,
      componentProps: {
        bindedFormArray: options,
      },
    });
    modal.present();
  }

  public addCustomization() {
    this.bindedFormArray.push(
      new ClassValidatorFormGroup<CustomizationFormModel>(
        EditCustomizationDto,
        {
          description: new ClassValidatorFormControl<string | null>(null),
          isMulti: new ClassValidatorFormControl<OptionCount>(
            OptionCount.SingleChoice,
          ),
          options: new ClassValidatorFormArray([]) as FormArray<
            FormGroup<OptionFormModel>
          >,
        },
      ),
    );
    this.accordionGroup.value = "" + (this.bindedFormArray.length - 1);
  }

  public removeCustomization(index: number) {
    this.bindedFormArray.removeAt(index);
  }
}
