import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NumericFilterFormModel } from "@shared/inputs/utils";

@Component({
  selector: "app-numeric-filter-input",
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
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
}
