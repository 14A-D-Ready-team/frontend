import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-selector-input",
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: "./selector-input.component.html",
  styleUrls: ["./selector-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorInputComponent<
  T,
  ValueProperty extends keyof T | undefined,
> {
  @Input()
  public title!: string;

  @Input()
  public items: T[] = [];

  @Input()
  public displayProperty?: keyof T;

  @Input()
  public valueProperty?: ValueProperty;

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
    this.bindedFormControl.reset();
    this.formReset.emit();
  }
}
