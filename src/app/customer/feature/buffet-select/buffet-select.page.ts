import { Component, OnInit, ViewChild } from "@angular/core";
import { IonModal } from "@ionic/angular";

@Component({
  selector: "app-buffet-select",
  templateUrl: "./buffet-select.page.html",
  styleUrls: ["./buffet-select.page.scss"],
})
export class BuffetSelectPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  message =
    "This modal example uses triggers to automatically open a modal when the button is clicked.";
  name!: string;

  cancel() {
    this.modal.dismiss(null, "cancel");
  }

  confirm() {
    this.modal.dismiss(this.name, "confirm");
  }
  constructor() {}

  ngOnInit() {}
}
