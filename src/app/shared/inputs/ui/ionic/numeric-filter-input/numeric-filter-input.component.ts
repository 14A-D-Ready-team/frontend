import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import {
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from "@angular/forms";
import { NumericFilterFormModel } from "@shared/inputs/utils";
import { TransformPipe } from "@shared/utils";
import { ValidationError } from "class-validator";

@Component({
  selector: "app-numeric-filter-input",
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TransformPipe],
  templateUrl: "./numeric-filter-input.component.html",
  styleUrls: ["./numeric-filter-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericFilterInputComponent {
  @Input()
  public title?: string;

  @Input()
  public bindedFormGroup!: FormGroup<NumericFilterFormModel>;

  public resetForm() {
    this.bindedFormGroup.controls.min.reset();
    this.bindedFormGroup.controls.max.reset();
    this.bindedFormGroup.controls.value.reset();
  }

  public extractErrorMessages(errors: Array<ValidationErrors | null>) {
    return [
      ...Object.values(errors[0] || {}),
      ...Object.values(errors[1] || {}),
      ...Object.values(errors[2] || {}),
    ].join("\n");
  }
}
