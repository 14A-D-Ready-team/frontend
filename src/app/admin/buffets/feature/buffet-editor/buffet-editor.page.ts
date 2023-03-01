import { environment } from "@/environments/environment";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Buffet, BuffetState, CreateBuffetDto } from "@shared/buffet";
import { ApiRequestStatus } from "@shared/extended-entity-state/utils";
import {
  ClassValidatorFormGroup,
  ClassValidatorFormControl,
} from "ngx-reactive-form-class-validator";
import { map, Observable, startWith, Subscription, take } from "rxjs";
import { BuffetEditorFormModel } from "../../utils";
import { formPath, Update } from "./store";

@Component({
  selector: "app-buffet-editor",
  templateUrl: "./buffet-editor.page.html",
  styleUrls: ["./buffet-editor.page.scss"],
})
export class BuffetEditorPage implements OnInit, OnDestroy {

  @Select(BuffetState.entities)
  public buffets$!: Observable<Buffet[]>;

  @Select(BuffetState.createStatus)
  public status$!: Observable<ApiRequestStatus | undefined>;

  public form: FormGroup<BuffetEditorFormModel>;

  public formPath = formPath;

  public idFromRoute!: string;

  private idSubscription!: Subscription;

  public get imageUrl()
  {
    return environment.api.url + "/buffet/" + this.idFromRoute + "/image";
  }

 

  public isDesktop$ = this.platform.resize.pipe(
    startWith(undefined),
    map(() => this.platform.width() >= 1200),
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform,
    private store: Store,
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

  public buffetById(index: number, el: Buffet): number {
    return el.id;
  }

  ngOnInit() {
    //hibaforrás lehet

    this.idSubscription = this.route.queryParams.subscribe(params => {
      // eslint-disable-next-line
      this.idFromRoute = params["id"];
    });
    this.buffets$.pipe(take(1)).subscribe(buffets =>
      buffets.forEach(buffet => {
        if (this.idFromRoute === buffet.id.toString()) {
          this.form.controls.name.setValue(buffet.name);
          this.form.controls.coords.setValue(buffet.coords);
          this.form.controls.address.setValue(buffet.address);
          this.form.controls.hours.setValue(buffet.hours || null);
          this.form.controls.description.setValue(buffet.description || null);
        }
      }),
    );
  }

  update() {
    this.store.dispatch(new Update(this.idFromRoute));
  }

  public async cancel() {
    this.router.navigate(["admin/buffets"]);
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
  }
}
