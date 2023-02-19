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

  @Output()
  public optionEditorOpened = new EventEmitter<void>();

  @Output()
  public deleted = new EventEmitter<void>();

  public optionsStatus$: Observable<FormControlStatus>;

  public get description() {
    return this.bindedFormGroup.controls.description;
  }

  public get options() {
    return this.bindedFormGroup.controls.options;
  }

  private initialized$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.optionsStatus$ = this.initialized$.pipe(
      filter(x => x),
      switchMap(() =>
        this.bindedFormGroup.statusChanges.pipe(
          delay(1),
          map(() => this.options.status),
        ),
      ),
      startWith<FormControlStatus>("VALID"),
    );
  }

  public ngOnInit(): void {
    if (!this.bindedFormGroup) {
      throw new Error("bindedFormGroup is required");
    }

    this.initialized$.next(true);
  }
}
