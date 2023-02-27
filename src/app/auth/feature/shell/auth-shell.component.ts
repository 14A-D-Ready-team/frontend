import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-auth-shell",
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="overlay">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
    </div>
    <ion-router-outlet></ion-router-outlet>
  `,
  styles: [
    `
      .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: var(--ion-color-dark);
      }

      ion-spinner {
        display: block;
        height: 30%;
        width: 30%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
