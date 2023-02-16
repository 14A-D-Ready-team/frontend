import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-customization-input",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "./customization-input.component.html",
  styleUrls: ["./customization-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationInputComponent implements OnInit {
  a() {
    console.log("ads");
  }
  constructor() {}

  ngOnInit(): void {}

  public handleReorder(event: any) {
    console.log(event);
    event.detail.complete();
  }
}