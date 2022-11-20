import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { processResponse } from "@app/shared/serialization";
import { User } from "@app/user";
import { LoginDto } from "../dto";

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
}
