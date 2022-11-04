import { VerifyGoogleAuthDto } from "./../dto/verify-google-auth.dto";
import { UserType } from "@app/user";

export class VerifyGoogleAuth {
  public static readonly type = "[Auth] VerifyGoogleAuth";

  public get dto() {
    return new VerifyGoogleAuthDto(this.idToken, this.userType);
  }

  constructor(private idToken: string, private userType: UserType) {}
}

export class SetAuthResult{
  public static readonly type = "[Auth] SetAuthResult";

  constructor() {}
}