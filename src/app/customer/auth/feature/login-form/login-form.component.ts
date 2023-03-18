import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { FormControl, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Login, LoginStateModel, LoginStatus } from "./store";
import { LoginDto } from "@shared/authentication";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
  admin: FormControl<boolean>;
}

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup<LoginForm>;

  @Select((state: { login: LoginStateModel }) => state.login.status)
  public loginStatus!: Observable<LoginStatus>;

  constructor(private store: Store) {
    this.loginForm = new ClassValidatorFormGroup<LoginForm>(LoginDto, {
      email: new ClassValidatorFormControl<string>(""),
      password: new ClassValidatorFormControl<string>(""),
      admin: new ClassValidatorFormControl<boolean>(false),
    });
  }

  public login() {
    this.store.dispatch(new Login());
  }

  ngOnInit() {}
}
