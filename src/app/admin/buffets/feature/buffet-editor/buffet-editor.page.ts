import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Select } from "@ngxs/store";
import {
  Buffet,
  BuffetService,
  BuffetState,
  CreateBuffetDto,
} from "@shared/buffet";
import {
  ClassValidatorFormGroup,
  ClassValidatorFormControl,
} from "ngx-reactive-form-class-validator";
import { map, Observable } from "rxjs";
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

  public async cancel() {
    this.router.navigate(["admin/buffets"]);
  }

  @Select(BuffetState.entities)
  public buffets$!: Observable<Buffet[]>;

  public form: FormGroup<BuffetEditorFormModel>;

  public formPath = formPath;

  // eslint-disable-next-line
  public idFromRoute: any;

  nameHelp: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    

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

  public buffetById(index: number, el: Buffet): number {
    return el.id;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // eslint-disable-next-line
      this.idFromRoute = params["id"];
    });
    //console.log(this.idFromRoute);

    // csak az első büfé nevét írja ki, utána nem frissül 
    this.buffets$.forEach(buffets =>
      buffets.forEach(buffet => {
        if (this.idFromRoute === buffet.id.toString()) {
          // if(buffet.name !== name){

          // }
          //this.nameHelp = buffet.name;
          this.form.controls.name.setValue(buffet.name);
          console.log(buffet.name);
        }
      }),
    );
  }
}
