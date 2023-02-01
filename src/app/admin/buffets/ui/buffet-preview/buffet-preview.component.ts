import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Buffet } from "@shared/buffet";

@Component({
  selector: "app-buffet-preview",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule],
  templateUrl: "./buffet-preview.component.html",
  styleUrls: ["./buffet-preview.component.scss"],
})
export class BuffetPreviewComponent implements OnInit {
  @Input()
  public buffet!: Buffet;

  @Output()
  public cardClick = new EventEmitter<void>();

  constructor() {}

  public ngOnInit() {
    if (!this.buffet) {
      throw new Error("The property buffet is required");
    }
  }
}
