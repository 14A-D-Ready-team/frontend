export function omitUnchangedProperties(target: object, original: object) {
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const value = target[key as keyof typeof target];
      const originalValue = original[key as keyof typeof original];

      if (
        value &&
        typeof value === "object" &&
        originalValue &&
        typeof originalValue === "object"
      ) {
        omitUnchangedProperties(value, originalValue);
        continue;
      }

      if (value === originalValue) {
        delete target[key as keyof typeof target];
      }
    }
  }
}
