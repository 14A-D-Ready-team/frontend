import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  IonAccordionGroup,
  IonicModule,
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

@Component({
  selector: "app-customization-input",
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: "./customization-input.component.html",
  styleUrls: ["./customization-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationInputComponent implements OnInit {
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

  public handleReorder(event: any) {
    console.log(event);
    event.detail.complete();
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
