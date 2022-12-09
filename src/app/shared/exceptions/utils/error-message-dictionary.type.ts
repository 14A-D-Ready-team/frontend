import { ErrorCode } from "./error-code.enum";

export type ErrorMessageDictionary = {
  [key in keyof typeof ErrorCode]?: string;
};
