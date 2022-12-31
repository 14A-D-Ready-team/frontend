import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
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
        justify-content: center;
        align-items: center;
      }

      ion-spinner {
        transform: scale(3);
      }
    `,
  ],
  template: ` <ion-spinner name="dots" color="light"></ion-spinner> `,
})
export class TypingOverlayComponent {}
