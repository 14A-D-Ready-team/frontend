import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { processResponse } from "@app/shared/serialization";
import { httpOptions } from "@shared/api";
import { User } from "@shared/user";
import { LoginDto, SignupDto } from "../dto";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signIn(payload: LoginDto) {
    return this.http
      .post(environment.api.url + "/auth/signin", payload, httpOptions)
      .pipe(processResponse(User));
  }
  public signUp(payload: SignupDto) {
    return this.http
      .post(environment.api.url + "/auth/signup", payload, httpOptions)
      .pipe(processResponse(User));
  }

  public signOut() {
    return this.http
      .post(environment.api.url + "/auth/logout", {}, httpOptions)
      .pipe(processResponse());
  }

  public sessionSignin() {
    return this.http
      .post(environment.api.url + "/auth/session-signin", {}, httpOptions)
      .pipe(processResponse(User));
  }

  public emailVerification(payload: { email: string }) {
    return this.http
      .post(
        environment.api.url + "/auth/send-email-verification",
        payload,
        httpOptions,
      )
      .pipe(processResponse());
  }

  public sendPasswordReset(payload: { email: string }) {
    return this.http
      .post(
        environment.api.url + "/auth/send-password-reset",
        payload,
        httpOptions,
      )
      .pipe(processResponse());
  }
}
