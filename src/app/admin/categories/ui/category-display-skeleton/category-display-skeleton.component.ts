import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-admin-category-display-skeleton",
  imports: [CommonModule, IonicModule],
  styleUrls: ["./category-display-skeleton.component.scss"],
  template: `
    <ion-item>
      <ion-skeleton-text animated></ion-skeleton-text>
      <div slot="end" class="icon-container">
        <ion-thumbnail>
          <ion-skeleton-text animated></ion-skeleton-text>
        </ion-thumbnail>
        <ion-thumbnail>
          <ion-skeleton-text animated></ion-skeleton-text>
        </ion-thumbnail>
      </div>
    </ion-item>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDisplaySkeletonComponent {}
