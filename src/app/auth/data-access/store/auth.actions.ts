import { UserType } from "@app/user";
import { VerifyGoogleAuthDto } from "../dto";

export class VerifyGoogleAuth {
  public static readonly type = "[Auth] VerifyGoogleAuth";

  public get dto() {
    return new VerifyGoogleAuthDto(this.idToken, this.userType);
  }

  constructor(private idToken: string, private userType: UserType) {}
}
