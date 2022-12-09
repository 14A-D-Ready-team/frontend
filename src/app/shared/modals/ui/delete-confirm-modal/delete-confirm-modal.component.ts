import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: "app-delete-confirm-modal",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule],
  styles: [
    `
      .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: space-between;
      }

      .container > div:first-child {
        display: flex;
        flex-direction: column;
        align-content: center;
        flex-grow: 1;
        height: 100%;
      }

      .btn-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 15px;
      }

      ion-icon {
        font-size: 12rem;
        display: block;
        margin: 0;
        align-self: center;
      }

      h1 {
        align-self: center;
        font-size: 1.5rem;
        text-align: center;
      }
    `,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Megerősítés</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="container">
        <div>
          <ion-icon color="danger" icon="warning-outline"></ion-icon>
          <h1>{{ message || "" }}</h1>
        </div>
        <div class="btn-container">
          <ion-button expand="block" color="danger" (click)="onConfirm()">
            Törlés
          </ion-button>
          <ion-button expand="block" color="medium" (click)="onCancel()">
            Mégse
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
})
export class DeleteConfirmModalComponent implements OnInit {
  @Input()
  public message?: string;

  constructor(private modalController: ModalController) {}

  public ngOnInit() {}

  public onConfirm() {
    this.modalController.dismiss(null, "confirm");
  }

  public onCancel() {
    this.modalController.dismiss(null, "cancel");
  }
}
