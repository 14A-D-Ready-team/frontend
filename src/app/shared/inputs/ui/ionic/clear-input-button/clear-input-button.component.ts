import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-clear-input-button",
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-button
      class="top-margin"
      fill="clear"
      color="dark"
      [disabled]="bindedFormControl.disabled"
      (click)="bindedFormControl.setValue(null)"
    >
      <ion-icon name="close-circle-outline" slot="icon-only"></ion-icon>
    </ion-button>
  `,
})
export class ClearInputButtonComponent implements OnInit {
  @Input()
  public bindedFormControl!: FormControl<any>;

  public ngOnInit(): void {
    if (!this.bindedFormControl) {
      throw new Error("formControl is not defined");
    }
  }
}
