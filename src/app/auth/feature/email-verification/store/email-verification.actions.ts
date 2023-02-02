import { User } from "@shared/user";

export class VerifyEmail {
  static readonly type = "[EmailVerificationPage] Verify Email";
}

export class VerifyEmailFailed {
  static readonly type = "[Auth Api] Verify Email Failed";

  constructor(public error: any) {}
}

export class VerifyEmailSucceeded {
  static readonly type = "[Auth Api] Verify Email Succeeded";
  constructor(public user: User) {}
}
