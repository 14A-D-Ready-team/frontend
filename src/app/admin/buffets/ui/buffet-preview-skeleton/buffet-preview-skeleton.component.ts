import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-admin-buffet-preview-skeleton",
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
        <p class="description-skeleton">
          <ion-skeleton-text animated></ion-skeleton-text>
        </p>
        <p class="other-fields-skeleton">
          <ion-skeleton-text animated></ion-skeleton-text>
        </p>
        <p class="other-fields-skeleton">
          <ion-skeleton-text animated></ion-skeleton-text>
        </p>
        <p class="other-fields-skeleton">
          <ion-skeleton-text animated></ion-skeleton-text>
        </p>
      </ion-card-content>

      <ion-thumbnail class="btn-skeleton">
        <ion-skeleton-text animated></ion-skeleton-text>
      </ion-thumbnail>
    </ion-card>
  `,
  styleUrls: ["./buffet-preview-skeleton.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule],
})
export class BuffetPreviewSkeletonComponent {}
