import { Select, Store } from "@ngxs/store";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { SignupDto } from "@shared/authentication";
import { Signup, SignupStateModel, SignupStatus } from "./store";
import { Observable } from "rxjs";

interface SignupForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"],
})
export class SignupFormComponent implements OnInit {
  public signupForm: FormGroup<SignupForm>;

  @Select((state: { signup: SignupStateModel }) => state.signup.status)
  public signupStatus!: Observable<SignupStatus>;

  constructor(private store: Store) {
    this.signupForm = new ClassValidatorFormGroup<SignupForm>(SignupDto, {
      name: new ClassValidatorFormControl<string>(""),
      email: new ClassValidatorFormControl<string>(""),
      password: new ClassValidatorFormControl<string>(""),
    });
  }

  public signup() {
    this.store.dispatch(new Signup());
  }

  ngOnInit() {}
}
