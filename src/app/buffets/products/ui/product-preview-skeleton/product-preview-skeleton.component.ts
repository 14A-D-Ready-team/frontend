import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-product-preview-skeleton",
  template: `
    <ion-card>
      <ion-thumbnail>
        <ion-skeleton-text animated></ion-skeleton-text>
      </ion-thumbnail>
      <ion-card-header>
        <ion-card-subtitle>
          <ion-skeleton-text animated></ion-skeleton-text>
        </ion-card-subtitle>
        <ion-card-title>
          <ion-skeleton-text animated></ion-skeleton-text>
        </ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <p>
          <ion-skeleton-text animated></ion-skeleton-text>
        </p>
        <p>
          <ion-skeleton-text animated></ion-skeleton-text>
        </p>
        <p>
          <ion-skeleton-text animated></ion-skeleton-text>
        </p>
      </ion-card-content>

      <ion-thumbnail class="btn-skeleton">
        <ion-skeleton-text animated></ion-skeleton-text>
      </ion-thumbnail>
    </ion-card>
  `,
  styleUrls: ["./product-preview-skeleton.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule],
})
export class ProductPreviewSkeletonComponent {}
