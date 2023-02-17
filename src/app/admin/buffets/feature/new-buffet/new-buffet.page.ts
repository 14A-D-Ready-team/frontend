import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Select } from "@ngxs/store";
import { BuffetState, Buffet, CreateBuffetDto } from "@shared/buffet";
import { ActivatedRoute, Router } from "@angular/router";
import { ClassValidatorFormGroup, ClassValidatorFormControl } from "ngx-reactive-form-class-validator";
import { Observable } from "rxjs";
import { BuffetEditorFormModel } from "../../utils";
import { formPath } from "../buffet-filter";

@Component({
  selector: "app-new-buffet",
  templateUrl: "./new-buffet.page.html",
  styleUrls: ["./new-buffet.page.scss"],
})
export class NewBuffetPage implements OnInit {
  save() {
    throw new Error("Method not implemented.");
  }
  
  public async cancel() {
    this.router.navigate(["admin/buffets"]);
  }

  @Select(BuffetState.entities)
  public buffets$!: Observable<Buffet[]>;

  public form: FormGroup<BuffetEditorFormModel>;

  public formPath = formPath;

  constructor(
    private router: Router,
  ) {
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
