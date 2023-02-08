import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-test",
  templateUrl: "./test.page.html",
  styleUrls: ["./test.page.scss"],
})
export class TestPage implements OnInit {
  public control = new FormControl<File | null>(null, {
    nonNullable: false,
  });

  constructor() {}

  ngOnInit() {}
}
