import { User, UserType } from "@shared/user";
import { VerifyGoogleAuthDto } from "../dto";

export class VerifyGoogleAuth {
  public static readonly type = "[Auth] VerifyGoogleAuth";

  public get dto() {
    return new VerifyGoogleAuthDto(this.idToken, this.userType);
  }

  constructor(private idToken: string, private userType: UserType) {}
}

export class Login {
  public static readonly type = "[Auth] Login";

  constructor(public user: User) {}
}

export class Logout {
  public static readonly type = "[Auth] Logout";
}
