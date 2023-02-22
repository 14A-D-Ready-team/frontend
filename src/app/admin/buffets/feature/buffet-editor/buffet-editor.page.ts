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
export class BuffetEditorPage implements OnInit, OnDestroy {
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

  public idFromRoute!: string;

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
    //hibaforrás lehet

    let idSubscription = this.route.queryParams.subscribe(params => {
      // eslint-disable-next-line
      this.idFromRoute = params["id"];
    });
    //console.log(this.idFromRoute);

    // csere subsribe-re
    // let subscription = asd.subscribe()......
    // a subscriptiont kell unsubscribeolni
    let formSubscription = this.buffets$.subscribe(buffets =>
      buffets.forEach(buffet => {
        if (this.idFromRoute === buffet.id.toString()) {
          this.form.controls.name.setValue(buffet.name);
          this.form.controls.coords.setValue(buffet.coords);
          this.form.controls.address.setValue(buffet.address);
          this.form.controls.hours.setValue(buffet.hours || null);
          this.form.controls.description.setValue(buffet.description || null);
          //console.log(buffet.name);
        }
      }),
    );
  }

  ngOnDestroy() {
    
  }
}
