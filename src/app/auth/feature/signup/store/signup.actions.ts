import { User } from "@shared/user";

export class Signup {
  static readonly type = "[SignupPage] Signup";
}

export class SignupFailed {
  static readonly type = "[Auth API] Signup Failed";

  constructor(public error: any) {}
}

export class SignupSucceeded {
  static readonly type = "[Auth API] Signup Succeeded";

  constructor(public user: User) {}
}
