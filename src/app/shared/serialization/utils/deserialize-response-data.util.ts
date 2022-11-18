/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from "@angular/core";
import { plainToInstance } from "class-transformer";

export function deserializeResponseData<T>(responseType: Type<T>, data: any) {
  const instance = plainToInstance(responseType, data);

  if (
    (responseType as any) === String ||
    (responseType as any) === Number ||
    (responseType as any) === Boolean
  ) {
    return instance;
  }

  if (instance instanceof responseType) {
    return instance;
  }
  return null;
}
