import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { BuffetState, Buffet, CreateBuffetDto } from "@shared/buffet";
import { Router } from "@angular/router";
import { ClassValidatorFormGroup, ClassValidatorFormControl } from "ngx-reactive-form-class-validator";
import { map, Observable, startWith } from "rxjs";
import { BuffetEditorFormModel } from "../../utils";
import { Platform } from "@ionic/angular";
import {
  formPath,
  LoadPage,
  Save,
} from "./store";
import { ApiRequestStatus } from "@shared/extended-entity-state/utils";

@Component({
  selector: "app-new-buffet",
  templateUrl: "./new-buffet.page.html",
  styleUrls: ["./new-buffet.page.scss"],
})
export class NewBuffetPage implements OnInit {

  @Select(BuffetState.entities)
  public buffets$!: Observable<Buffet[]>;

  @Select(BuffetState.createStatus)
  public status$!: Observable<ApiRequestStatus | undefined>;

  public form: FormGroup<BuffetEditorFormModel>;

  public formPath = formPath;

  public isDesktop$ = this.platform.resize.pipe(
    startWith(undefined),
    map(() => this.platform.width() >= 1200),
  );

  constructor(
    private router: Router,
    private store: Store,
    private platform: Platform,
  ) {
    this.form = new ClassValidatorFormGroup<BuffetEditorFormModel>(
      CreateBuffetDto,
      {
        name: new ClassValidatorFormControl<string | null>(null),
        coords: new ClassValidatorFormControl<string | null>(null),
        address: new ClassValidatorFormControl<string | null>(null),
        hours: new ClassValidatorFormControl<string | null>(null),
        description: new ClassValidatorFormControl<string | null>(null),
        image: new FormControl<File | null>(null),
      },
    );
  }
  
  ngOnInit() {
    this.store.dispatch(new LoadPage());
  }

  save() {
    this.store.dispatch(new Save());
  }
  
  public cancel() {
    this.router.navigate(["admin/buffets"]);
  }

}
