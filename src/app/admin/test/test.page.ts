import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-test",
  templateUrl: "./test.page.html",
  styleUrls: ["./test.page.scss"],
})
export class TestPage implements OnInit {
  a() {
    this.myForm.disable();
    console.log(this.itemsArray.parent?.parent);
  }

  public myForm: FormGroup;
  public itemsArray: FormArray<
    FormGroup<{
      name: FormControl<string | null>;
      extraCost: FormControl<number | null>;
    }>
  >;

  constructor() {
    this.itemsArray = new FormArray([
      new FormGroup({
        name: new FormControl("Item 1"),
        extraCost: new FormControl(0),
      }),
      new FormGroup({
        name: new FormControl("Item 2"),
        extraCost: new FormControl(0),
      }),
    ]);

    this.myForm = new FormGroup({
      test: new FormControl(""),
      items: this.itemsArray,
    });
  }

  ngOnInit() {}
}
