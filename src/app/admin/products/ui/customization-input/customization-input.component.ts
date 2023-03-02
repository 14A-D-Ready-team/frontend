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
import { CustomizationFormModel } from "../../utils";
import {
  FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  ClearInputButtonComponent,
  ErrorListComponent,
} from "@shared/inputs/ui/ionic";
import { FormChangesPipe } from "@shared/utils";
import {
  BehaviorSubject,
  delay,
  filter,
  map,
  merge,
  Observable,
  of,
  startWith,
  switchMap,
} from "rxjs";

@Component({
  selector: "app-customization-input",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ErrorListComponent,
    ClearInputButtonComponent,
    FormChangesPipe,
  ],
  templateUrl: "./customization-input.component.html",
  styleUrls: ["./customization-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationInputComponent implements OnInit {
  @Input()
  public bindedFormGroup!: FormGroup<CustomizationFormModel>;

  @Input()
  public i = 0;

  @Output()
  public optionEditorOpened = new EventEmitter<void>();

  @Output()
  public deleted = new EventEmitter<void>();

  public get description() {
    return this.bindedFormGroup.controls.description;
  }

  public get options() {
    return this.bindedFormGroup.controls.options;
  }

  constructor() {}

  public ngOnInit(): void {
    if (!this.bindedFormGroup) {
      throw new Error("bindedFormGroup is required");
    }
  }
}
