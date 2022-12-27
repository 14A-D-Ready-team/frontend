import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ErrorMessagePipe } from "../../../utils/pipes";

@Component({
  selector: "app-error-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, ErrorMessagePipe],
  template: `
    <ion-card color="danger">
      <ion-card-header *ngIf="header">
        <ion-card-title class="ion-text-center">{{ header }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>{{ error | errorMessage }}</p>
        <ion-button
          class="ion-margin-top"
          color="secondary"
          (click)="retry.emit()"
        >
          Újrapróbálkozás</ion-button
        >
      </ion-card-content>
    </ion-card>
  `,
  styles: [
    `
      ion-card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
})
export class ErrorCardComponent {
  @Input()
  public error: any;

  @Input()
  public header?: string;

  @Output()
  public retry: EventEmitter<void> = new EventEmitter();
}
