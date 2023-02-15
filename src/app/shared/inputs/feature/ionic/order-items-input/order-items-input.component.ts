import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderItemsFormModel } from '@shared/inputs/utils/order-items-form.model';
import { TransformPipe } from '@shared/utils';

@Component({
  selector: 'app-order-items-input',
  templateUrl: './order-items-input.component.html',
  styleUrls: ['./order-items-input.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TransformPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemsInputComponent {

  @Input()
  public title?: string;

  @Input()
  public bindedFormControl!: FormControl;

  public resetForm() {
    this.bindedFormControl.reset();
  }

  public extractErrorMessages(errors: Array<ValidationErrors | null>) {
    return [
      ...Object.values(errors[0] || {}),
    ].join("\n");
  }

}
