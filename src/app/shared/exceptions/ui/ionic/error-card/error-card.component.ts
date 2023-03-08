import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ErrorMessagePipe } from "../../../utils";

@Component({
  selector: "app-error-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, ErrorMessagePipe],
  template: `
    <ion-card [color]="color">
      <ion-card-header *ngIf="header">
        <ion-card-title class="ion-text-center">{{ header }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item lines="none">
          <ion-icon *ngIf="icon" slot="start" [name]="icon"></ion-icon>
          <ion-label>{{ error | errorMessage }}</ion-label>
        </ion-item>
        <ion-button
          *ngIf="showRetryButton"
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

      ion-item {
        background-color: transparent;
        --background: transparent;
      }
    `,
  ],
})
export class ErrorCardComponent {
  @Input()
  public error: any;

  @Input()
  public header?: string;

  @Input()
  public color = "danger";

  @Input()
  public showRetryButton = true;

  @Input()
  public icon?: string;

  @Output()
  public retry: EventEmitter<void> = new EventEmitter();
}
