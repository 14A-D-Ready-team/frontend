/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from "@angular/core";
import { ApiException, ErrorCode } from "@shared/exceptions";
import { plainToInstance } from "class-transformer";
import { serializationConfig } from "./serialization.config";

export function deserializeResponseData<T>(responseType: Type<T>, data: any) {
  const instance = plainToInstance(responseType, data, serializationConfig);

  if (
    (responseType as any) === String ||
    (responseType as any) === Number ||
    (responseType as any) === Boolean
  ) {
    return instance;
  }

  if (!(instance instanceof responseType)) {
    throw new ApiException(ErrorCode.InvalidApiResponseException);
  }

  return instance;
}
