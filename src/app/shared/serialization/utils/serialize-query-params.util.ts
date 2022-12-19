import { instanceToPlain } from "class-transformer";

export function serializeQueryParams(params: object) {
  const transformed = instanceToPlain(params);
  const serialized = {} as Record<string, string>;
  for (const key in transformed) {
    if (transformed.hasOwnProperty(key) && transformed[key] !== undefined) {
      const value = JSON.stringify(transformed[key]);
      serialized[key] = value;
    }
  }
  return serialized;
}
