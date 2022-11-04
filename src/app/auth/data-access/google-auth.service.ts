import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VerifyGoogleAuthDto } from "./dto/verify-google-auth.dto";

@Injectable({
  providedIn: "root",
})
export class GoogleAuthService {
  constructor(private http: HttpClient) {}

  public verify(payload: VerifyGoogleAuthDto) {
    return this.http.post(environment.api.url + "/auth/google", payload);
  }
}
