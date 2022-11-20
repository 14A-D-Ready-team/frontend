import { Component, Inject, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "@app/auth/data-access";
import { LoginDto } from "@app/auth/data-access/dto";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: "",
      password: "",
    });
  }

  public login() {
    const loginDto = new LoginDto(
      this.loginForm.value.email,
      this.loginForm.value.password,
    );
    this.authService.signIn(loginDto).subscribe(console.log);
  }

  ngOnInit() {}
}
