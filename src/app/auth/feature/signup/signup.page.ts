import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { SignupDto } from "@app/auth/data-access/dto";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Signup, SignupStateModel, SignupStatus } from "./store";
import { Observable } from "rxjs";

interface SignupForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup<SignupForm>;

  @Select((state: { signup: SignupStateModel }) => state.signup.status)
  public signupStatus!: Observable<SignupStatus>;

  constructor(private store: Store) {
    this.signupForm = new ClassValidatorFormGroup<SignupForm>(SignupDto, {
      name: new ClassValidatorFormControl<string>(""),
      email: new ClassValidatorFormControl<string>(""),
      password: new ClassValidatorFormControl<string>(
        "",
        Validators.minLength(8),
      ),
    });
  }

  public signup() {
    this.store.dispatch(new Signup());
  }

  ngOnInit() {}
}
