import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-admin-header",
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="font-bold">{{ pageTitle }}</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-menu-button menu="end">
            <ion-icon part="icon" name="funnel"></ion-icon>
          </ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent {
  @Input()
  public pageTitle!: string;
}
