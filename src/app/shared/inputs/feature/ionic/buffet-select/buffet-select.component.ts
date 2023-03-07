import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-buffet-select",
  templateUrl: "./buffet-select.component.html",
  styleUrls: ["./buffet-select.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule ],
})
export class BuffetSelectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
