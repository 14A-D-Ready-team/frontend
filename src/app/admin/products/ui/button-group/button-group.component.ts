import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-admin-button-group",
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="button-container">
      <ion-button
        fill="clear"
        color="medium"
        [disabled]="cancelDisabled"
        (click)="cancel.emit()"
      >
        Mégse
      </ion-button>
      <ion-button
        fill="clear"
        color="success"
        [disabled]="saveDisabled"
        (click)="save.emit()"
      >
        Mentés
      </ion-button>
      <ion-spinner color="primary" *ngIf="loading"></ion-spinner>
    </div>
  `,
  styleUrls: ["./button-group.component.scss"],
})
export class ButtonGroupComponent implements OnInit {
  @Input()
  public loading = false;

  @Input()
  public saveDisabled = false;

  @Input()
  public cancelDisabled = false;

  @Output()
  public save = new EventEmitter<void>();

  @Output()
  public cancel = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
