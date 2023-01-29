import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-admin-header",
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <div class="header-content">
          <ion-title class="font-bold">{{ pageTitle }}</ion-title>
          <ion-item lines="none" routerLink="/admin/buffets">
            <ion-icon name="restaurant-outline" slot="start"></ion-icon>
            <ion-label>Büfék</ion-label>
          </ion-item>
          <ion-item lines="none" routerLink="/admin/categories">
            <ion-icon name="albums-outline" slot="start"></ion-icon>
            <ion-label>Kategóriák</ion-label>
          </ion-item>
          <ion-item lines="none" routerLink="/admin/products">
            <ion-icon name="fast-food-outline" slot="start"></ion-icon>
            <ion-label>Termékek</ion-label>
          </ion-item>
        </div>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ng-content select="[end-buttons]"></ng-content>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  styles: [
    `
      .header-content {
        display: flex;
        flex-direction: row;
      }

      ion-item {
        --background: #ffffff00;
        --color: #fff;
      }

      ion-item ion-icon {
        color: #fff;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent {
  @Input()
  public pageTitle!: string;
}
