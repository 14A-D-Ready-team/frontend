import { User } from "@shared/user";

export class EmailVerification {
  static readonly type = "[EmailVerificationPage] EmailVerification";
}

export class EmailVerificationFailed {
  static readonly type = "[Auth API] EmailVerification Failed";
  constructor(public error: any) {}
}

export class EmailVerificationSucceeded {
  static readonly type = "[Auth API] EmailVerification Succeeded";
}
