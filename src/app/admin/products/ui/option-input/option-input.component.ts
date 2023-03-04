import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import {
  ClearInputButtonComponent,
  ErrorListComponent,
} from "@shared/inputs/ui/ionic";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { OptionFormModel } from "../../utils";
import { FormChangesPipe } from "@shared/utils";

@Component({
  selector: "app-admin-option-input",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ErrorListComponent,
    ClearInputButtonComponent,
    FormChangesPipe,
  ],
  templateUrl: "./option-input.component.html",
  styleUrls: ["./option-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionInputComponent implements OnInit {
  @Input()
  public bindedFormGroup!: FormGroup<OptionFormModel>;

  @Output()
  public deleted = new EventEmitter<void>();

  public get name() {
    return this.bindedFormGroup.controls.name;
  }

  public get extraCost() {
    return this.bindedFormGroup.controls.extraCost;
  }

  constructor() {}

  public ngOnInit(): void {
    if (!this.bindedFormGroup) {
      throw new Error("bindedFormGroup is required");
    }
  }
}
