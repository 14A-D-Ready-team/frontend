export class SendPasswordReset {
  static readonly type = "[SendPasswordResetPage] Send Password Reset";
}

export class SendPasswordResetFailed {
  static readonly type = "[Auth API] Send Password Reset Failed";

  constructor(public error: any) {}
}

export class SendPasswordResetSucceeded {
  static readonly type = "[Auth API] Send Password Reset Succeeded";

  constructor() {}
}
