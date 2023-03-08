import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "@shared/user";
import { Select, Store } from "@ngxs/store";
import { AuthState, Logout } from "@shared/authentication";
import { Category, CategoryState } from "@shared/category";
import { Buffet, BuffetState } from "@shared/buffet";

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
            <div class="buffet-label-container">
              <ion-label>Büfék</ion-label>
              <ion-label
                class="chosen-buffet-label"
                *ngIf="activeBuffet$ | async as buffet"
                >Kiválasztva: {{ buffet.name }}</ion-label
              >
            </div>
          </ion-item>
          <ion-item lines="none" routerLink="/admin/categories">
            <ion-icon name="albums-outline" slot="start"></ion-icon>
            <ion-label>Kategóriák</ion-label>
          </ion-item>
          <ion-item lines="none" routerLink="/admin/products">
            <ion-icon name="fast-food-outline" slot="start"></ion-icon>
            <ion-label>Termékek</ion-label>
          </ion-item>
          <ion-item
            class="user-item"
            lines="none"
            *ngIf="user$ | async as user"
          >
            <ion-icon slot="start" name="person-outline"> </ion-icon>
            <ion-label> {{ user.name }} </ion-label>
            <ion-button fill="clear" slot="end" (click)="logout()">
              <ion-icon name="exit-outline" slot="icon-only"></ion-icon>
            </ion-button>
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
  styleUrls: ["./admin-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent {
  @Input()
  public pageTitle!: string;

  @Select(AuthState.user)
  public user$!: Observable<User>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet | undefined>;

  constructor(private store: Store) {}

  public logout() {
    this.store.dispatch(new Logout());
  }
}
