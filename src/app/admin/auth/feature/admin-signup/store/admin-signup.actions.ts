import { User } from "@shared/user";

export class AdminSignup {
  static readonly type = "[AdminSignupPage] Signup";
}

export class AdminSignupFailed {
  static readonly type = "[Auth API] Signup Failed";

  constructor(public error: any) {}
}

export class AdminSignupSucceeded {
  static readonly type = "[Auth API] Signup Succeeded";

  constructor(public user: User) {}
}
