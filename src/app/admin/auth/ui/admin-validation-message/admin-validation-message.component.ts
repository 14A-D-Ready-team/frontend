import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";

@Component({
  selector: "app-admin-validation-message",
  styleUrls: ["./admin-validation-message.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="validation-container"
      [style.visibility]="visible ? 'visible' : 'hidden'"
    >
      <p class="validation-text">{{ errorMessage }}</p>
    </div>
  `,
})
export class AdminValidationMessageComponent implements OnInit {
  @Input()
  public errorMessage = "";

  @Input()
  public visible = false;

  constructor() {}

  ngOnInit() {}
}
