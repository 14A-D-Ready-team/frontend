import { Params } from "@angular/router";
import { User, UserType } from "@shared/user";
import { VerifyGoogleAuthDto } from "../dto";

export class VerifyGoogleAuth {
  public static readonly type = "[Auth] VerifyGoogleAuth";

  public get dto() {
    return new VerifyGoogleAuthDto(this.idToken);
  }

  constructor(private idToken: string) {}
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

export class SessionSignin {
  public static readonly type = "[Auth] Session Signin";

  constructor() {}
}

export class SessionSigninFailed {
  public static readonly type = "[Auth] Session Signin Failed";

  constructor(public error: any) {}
}

export class SessionSigninSucceeded {
  public static readonly type = "[Auth] Session Signin Succeeded";

  constructor(public user: User) {}
}

export class SessionSigninCompleted {
  public static readonly type = "[Auth] Session Signin Completed";

  constructor() {}
}

export class PoliciesUpdated {
  public static readonly type = "[Auth] Policies Updated";
}
