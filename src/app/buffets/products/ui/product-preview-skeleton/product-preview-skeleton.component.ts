import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-product-preview-skeleton",
  template: `
    <ion-card>
      <img alt="Product image" />
      <ion-card-header>
        <ion-card-subtitle></ion-card-subtitle>
        <ion-card-title></ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <p></p>
        <p>
          <b></b>
        </p>

        <p></p>
      </ion-card-content>

      <ion-button fill="clear" color="danger">
        <ion-icon slot="start" name="trash"></ion-icon>
        Törlés
      </ion-button>
    </ion-card>
  `,
  styleUrls: ["./product-preview-skeleton.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule],
})
export class ProductPreviewSkeletonComponent {}
