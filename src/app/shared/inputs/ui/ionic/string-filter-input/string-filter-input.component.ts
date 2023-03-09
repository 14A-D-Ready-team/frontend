import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {
  ReactiveFormsModule,
  FormGroup,
  ValidationErrors,
} from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { StringFilterFormModel } from "@shared/inputs/utils";
import { TransformPipe } from "@shared/utils";

@Component({
  selector: "app-string-filter-input",
  templateUrl: "./string-filter-input.component.html",
  styleUrls: ["./string-filter-input.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TransformPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StringFilterInputComponent {
  @Input()
  public title?: string;

  @Input()
  public bindedFormGroup!: FormGroup<StringFilterFormModel>;

  public resetForm() {
    this.bindedFormGroup.controls.searchString.reset();
  }

  public extractErrorMessages(errors: Array<ValidationErrors | null>) {
    return [...Object.values(errors[0] || {})].join("\n");
  }
}
