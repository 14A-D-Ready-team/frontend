import { isEmpty } from "lodash";

export function deleteEmptyPropertiesDeep(object: Record<any, any>) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (value === undefined) {
        delete object[key];
        continue;
      }
      if (typeof value === "object") {
        deleteEmptyPropertiesDeep(value);
        if (isEmpty(value)) {
          delete object[key];
        }
      }
    }
  }
  return object;
}
