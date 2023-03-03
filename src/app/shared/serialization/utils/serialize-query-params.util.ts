import { instanceToPlain } from "class-transformer";
import { deleteEmptyPropertiesDeep } from "./delete-empty-properties-deep.util";

export function serializeQueryParams(params: object) {
  const newLocal = instanceToPlain(params, {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
  });
  console.log(newLocal);
  const transformed = deleteEmptyPropertiesDeep(newLocal);

  const serialized = {} as Record<string, string>;
  for (const key in transformed) {
    if (transformed.hasOwnProperty(key) && transformed[key] !== undefined) {
      const value = JSON.stringify(transformed[key]);
      serialized[key] = value;
    }
  }
  return serialized;
}
