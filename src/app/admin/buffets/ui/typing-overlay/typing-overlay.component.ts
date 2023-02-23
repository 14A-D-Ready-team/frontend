import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-typing-overlay",
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        background-color: #22242870;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      ion-spinner {
        transform: scale(3);
      }

      h1 {
        margin-top: 30vh;
        color: var(--ion-color-light);
        text-align: center;
        font-size: 1.3rem;
      }
    `,
  ],
  template: `
    <h1>A keresés elindul, amint végez a szűrők beállításával.</h1>
    <ion-spinner name="dots" color="light"></ion-spinner>
  `,
})
export class TypingOverlayComponent {}
