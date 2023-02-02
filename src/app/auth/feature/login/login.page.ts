import { Component, Inject, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "@app/auth/data-access";
import { LoginDto } from "@app/auth/data-access/dto";
import {
  Login,
  LoginState,
  LoginStateModel,
  LoginStatus,
  LOGIN_STATE_TOKEN,
} from "./store";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Observable } from "rxjs";
import { LoadingController } from "@ionic/angular";

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

  @Select((state: { login: LoginStateModel }) => state.login.status)
  public loginStatus!: Observable<LoginStatus>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
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
