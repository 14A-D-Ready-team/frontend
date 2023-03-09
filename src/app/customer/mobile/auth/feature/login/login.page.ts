import { Component, OnInit } from "@angular/core";
// import { Select, Store } from "@ngxs/store";
// import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
// import { Login, LoginStateModel, LoginStatus } from "./store";
// import {
//   ClassValidatorFormControl,
//   ClassValidatorFormGroup,
// } from "ngx-reactive-form-class-validator";
// import { Observable } from "rxjs";
// import { LoadingController } from "@ionic/angular";
// import { AuthService, LoginDto } from "@shared/authentication";
// import { ActivatedRoute } from "@angular/router";

// interface LoginForm {
//   email: FormControl<string>;
//   password: FormControl<string>;
// }
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  // public loginForm: FormGroup<LoginForm>;

  // @Select((state: { login: LoginStateModel }) => state.login.status)
  // public loginStatus!: Observable<LoginStatus>;

  constructor() // private loadingCtrl: LoadingController, // private authService: AuthService, // private fb: FormBuilder, // private store: Store,
  // private route: ActivatedRoute,
  {
    // this.loginForm = new ClassValidatorFormGroup<LoginForm>(LoginDto, {
    //   email: new ClassValidatorFormControl<string>(""),
    //   password: new ClassValidatorFormControl<string>(""),
    // });
  }

  // public login() {
  //   this.store.dispatch(new Login());
  // }

  ngOnInit() {}
}
