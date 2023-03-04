import { User } from "@shared/user";

export class Login {
  static readonly type = "[LoginPage] Login";
}

export class LoginFailed {
  static readonly type = "[Auth API] Login Failed";

  constructor(public error: any) {}
}

export class LoginSucceeded {
  static readonly type = "[Auth API] Login Succeeded";

  constructor(public user: User) {}
}
