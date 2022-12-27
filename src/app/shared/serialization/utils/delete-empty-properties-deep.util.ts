import { isEmpty } from "lodash";

export function deleteEmptyPropertiesDeep(object: Record<any, any>) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (typeof value === "object" && isEmpty(value)) {
        delete object[key];
      } else if (typeof value === "object") {
        deleteEmptyPropertiesDeep(value);
      }
    }
  }
  return object;
}
