import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { processResponse } from "@app/shared/serialization";
import { User } from "@shared/user";
import { LoginDto, SignupDto } from "../dto";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signIn(payload: LoginDto) {
    return this.http
      .post(environment.api.url + "/auth/signin", payload)
      .pipe(processResponse(User));
  }
  public signUp(payload: SignupDto) {
    return this.http
      .post(environment.api.url + "/auth/signup", payload)
      .pipe(processResponse(User));
  }

  public emailVerification(payload: { email: string }) {
    return this.http
      .post(environment.api.url + "/auth/send-email-verification", payload)
      .pipe(processResponse());
  }

  public sendPasswordReset(payload: { email: string }) {
    return this.http
      .post(environment.api.url + "/auth/send-password-reset", payload)
      .pipe(processResponse());
  }
}
