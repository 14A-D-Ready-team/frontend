import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-ionic-error-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-card color="danger">
      <ion-card-header>
        <ion-card-title class="ion-text-center">Hiba</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>{{ error | json }}</p>
        <ion-button class="ion-margin-top" color="tertiary"
          >Újrapróbálkozás</ion-button
        >
      </ion-card-content>
    </ion-card>
  `,
})
export class IonicErrorCardComponent {
  @Input()
  public error: any;
}
