import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { processResponse } from "@app/shared/serialization";
import { httpOptions } from "@shared/api";
import { User } from "@shared/user";
import { VerifyGoogleAuthDto } from "../dto";

@Injectable({
  providedIn: "root",
})
export class GoogleAuthService {
  constructor(private http: HttpClient) {}

  public verify(payload: VerifyGoogleAuthDto) {
    return this.http
      .post(environment.api.url + "/auth/google/verify", payload, httpOptions)
      .pipe(processResponse(User));
  }
}
