import { User, UserType } from "@shared/user";
import { VerifyGoogleAuthDto } from "../dto";

export class VerifyGoogleAuth {
  public static readonly type = "[Auth] VerifyGoogleAuth";

  public get dto() {
    return new VerifyGoogleAuthDto(this.idToken, this.userType);
  }

  constructor(private idToken: string, private userType: UserType) {}
}

export class SetCurrentLogin {
  public static readonly type = "[Auth] Set Current Login";

  constructor(public user: User) {}
}

export class Logout {
  public static readonly type = "[Auth] Logout";
}

export class LogoutFailed {
  public static readonly type = "[Auth] Logout Failed";

  constructor(public error: any) {}
}

export class LogoutSucceeded {
  public static readonly type = "[Auth] Logout Succeeded";
}
