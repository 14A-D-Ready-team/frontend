import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule, ModalController } from "@ionic/angular";
import { OptionEditorModalComponent } from "../option-editor-modal";

@Component({
  selector: "app-customization-input",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "./customization-input.component.html",
  styleUrls: ["./customization-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizationInputComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {}

  public handleReorder(event: any) {
    console.log(event);
    event.detail.complete();
  }

  public async openOptionEditor() {
    const modal = await this.modalCtrl.create({
      component: OptionEditorModalComponent,
    });
    modal.present();
  }
}
