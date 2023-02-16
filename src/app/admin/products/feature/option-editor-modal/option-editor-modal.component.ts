import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-option-editor-modal",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "./option-editor-modal.component.html",
  styleUrls: ["./option-editor-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionEditorModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public close(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
}
