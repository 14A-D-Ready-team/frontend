import { Component, Inject, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "@app/auth/data-access";
import { LoginDto } from "@app/auth/data-access/dto";
import { Login } from "./store";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup<LoginForm>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = new ClassValidatorFormGroup<LoginForm>(LoginDto, {
      email: new ClassValidatorFormControl<string>(""),
      password: new ClassValidatorFormControl<string>(""),
    });
  }

  public login() {
    this.store.dispatch(new Login());
  }

  ngOnInit() {}
}
