import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Select } from "@ngxs/store";
import { Buffet, BuffetState, CreateBuffetDto } from "@shared/buffet";
import { ClassValidatorFormGroup, ClassValidatorFormControl } from "ngx-reactive-form-class-validator";
import { Observable } from "rxjs";
import { BuffetEditorFormModel } from "../../utils";
import { formPath } from "./store";

@Component({
  selector: "app-buffet-editor",
  templateUrl: "./buffet-editor.page.html",
  styleUrls: ["./buffet-editor.page.scss"],
})
export class BuffetEditorPage implements OnInit {
  save() {
    throw new Error("Method not implemented.");
  }
  @Select(BuffetState.entities)
  public buffets$!: Observable<Buffet[]>;

  public form: FormGroup<BuffetEditorFormModel>;

  public formPath = formPath;

  constructor() {
    this.form = new ClassValidatorFormGroup<BuffetEditorFormModel>(
      CreateBuffetDto,
      {
        name: new ClassValidatorFormControl<string | null>(null),
        coords: new ClassValidatorFormControl<string | null>(null),
        address: new ClassValidatorFormControl<string | null>(null),
        hours: new ClassValidatorFormControl<string | null>(null),
        description: new ClassValidatorFormControl<string | null>(null),
      },
    );
  }

  ngOnInit() {}
}