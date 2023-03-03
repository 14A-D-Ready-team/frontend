import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TransformPipe } from "@shared/utils";
import { ValidationErrors } from "@angular/forms";

@Component({
  selector: "app-error-list",
  standalone: true,
  imports: [CommonModule, IonicModule, TransformPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let error of errors || {} | transform : getValuesOfDict">
      <ion-note color="danger">
        {{ error }}
      </ion-note>
    </div>
  `,
})
export class ErrorListComponent {
  @Input()
  public errors: ValidationErrors | null = null;

  public getValuesOfDict(dict: ValidationErrors) {
    return Object.values(dict);
  }
}
