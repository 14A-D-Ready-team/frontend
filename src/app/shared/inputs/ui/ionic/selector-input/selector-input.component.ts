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
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { FirstErrorMessagePipe } from "@shared/exceptions";
import { ClearInputButtonComponent } from "@shared/inputs/ui/ionic";
import { FormChangesPipe } from "@shared/utils";

@Component({
  selector: "app-selector-input",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FirstErrorMessagePipe,
    ClearInputButtonComponent,
    FormChangesPipe,
  ],
  templateUrl: "./selector-input.component.html",
  styleUrls: ["./selector-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorInputComponent<
  T,
  ValueProperty extends keyof T | undefined,
> implements OnInit
{
  @Input()
  public title!: string;

  @Input()
  public items: T[] = [];

  @Input()
  public displayProperty?: keyof T;

  @Input()
  public valueProperty?: ValueProperty & keyof T;

  @Input()
  public bindedFormControl!: FormControl<
    (ValueProperty extends keyof T ? T[ValueProperty] : T) | null
  >;

  @Input()
  public loading = false;

  @Output()
  public formReset = new EventEmitter<void>();

  @Output()
  public refresh = new EventEmitter<void>();

  public resetForm() {
    this.bindedFormControl.setValue(null);
    this.formReset.emit();
  }

  public ngOnInit(): void {
    if (!this.bindedFormControl) {
      throw new Error("bindedFormControl is required");
    }
  }
}
