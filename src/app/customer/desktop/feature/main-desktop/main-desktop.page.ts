import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-desktop",
  templateUrl: "./main-desktop.page.html",
  styleUrls: ["./main-desktop.page.scss"],
})
export class MainDesktopPage implements OnInit {
  constructor() {}

  selectedSegment: string = "login";

  segmentChanged(event: any) {
    console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }

  ngOnInit() {}
}
