import { InjectionToken } from "@angular/core";
import { ErrorMessageDictionary } from "./error-message-dictionary.type";

export const ERROR_MESSAGES = new InjectionToken<ErrorMessageDictionary[]>(
  "ERROR_MESSAGES",
);
