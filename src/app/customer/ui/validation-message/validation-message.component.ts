import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";

@Component({
  selector: "app-validation-message",
  styleUrls: ["./validation-message.component.scss"],
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
export class ValidationMessageComponent implements OnInit {
  @Input()
  public errorMessage: string = "";

  @Input()
  public visible = false;

  constructor() {}

  ngOnInit() {}
}
