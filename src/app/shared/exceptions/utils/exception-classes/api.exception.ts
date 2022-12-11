import { Expose } from "class-transformer";
import { ErrorCode } from "../error-code.enum";

export class ApiException {
  @Expose()
  public errorCode!: ErrorCode;

  constructor(errorCode: ErrorCode) {
    this.errorCode = errorCode;
  }
}
