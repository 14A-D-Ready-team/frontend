import { Inject, Injectable } from "@angular/core";
import { ApiException, ERROR_MESSAGES } from "..";
import { ErrorMessageDictionary } from "../error-message-dictionary.type";

@Injectable({
  providedIn: "root",
})
export class ExceptionService {
  private mergedErrorMessages: ErrorMessageDictionary;

  constructor(
    @Inject(ERROR_MESSAGES)
    private errorMessages: ErrorMessageDictionary[],
  ) {
    this.mergedErrorMessages = Object.assign(
      errorMessages[0] || {},
      ...errorMessages.slice(1),
    );
  }

  public getErrorMessage(error: any): string {
    if (error instanceof ApiException) {
      return (
        this.mergedErrorMessages[error.errorCode] ||
        this.mergedErrorMessages.UnknownException!
      );
    }

    return this.mergedErrorMessages.UnknownException!;
  }
}
