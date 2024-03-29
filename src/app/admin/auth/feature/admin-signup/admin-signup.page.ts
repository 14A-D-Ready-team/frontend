import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { SignupDto } from "@shared/authentication";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Observable } from "rxjs";
import { AdminSignup, AdminSignupStateModel, AdminSignupStatus } from "./store";

interface AdminSignupForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  type: FormControl<number>;
  inviteToken: FormControl<string>;
}
@Component({
  selector: "app-admin-signup",
  templateUrl: "./admin-signup.page.html",
  styleUrls: ["./admin-signup.page.scss"],
})
export class AdminSignupPage implements OnInit {
  public adminSignupForm: FormGroup<AdminSignupForm>;

  @Select((state: { signup: AdminSignupStateModel }) => state.signup.status)
  public adminSignupStatus!: Observable<AdminSignupStatus>;

  public loading = false;

  constructor(private store: Store) {
    this.adminSignupForm = new ClassValidatorFormGroup<AdminSignupForm>(
      SignupDto,
      {
        name: new ClassValidatorFormControl<string>(""),
        email: new ClassValidatorFormControl<string>(""),
        password: new ClassValidatorFormControl<string>(""),
        type: new ClassValidatorFormControl<number>(null),
        inviteToken: new ClassValidatorFormControl<string>(""),
      },
    );
  }

  public signup() {
    //console.log(this.adminSignupForm);
    this.loading = true;
    this.store.dispatch(new AdminSignup());
  }

  ngOnInit() {}
}
