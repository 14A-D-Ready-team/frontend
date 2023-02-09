export function createFormData(serializedData: Record<string, any>) {
  const formData = new FormData();
  for (const key in serializedData) {
    if (!Object.prototype.hasOwnProperty.call(serializedData, key)) {
      continue;
    }

    const value = serializedData[key];
    if (value instanceof File) {
      formData.append(key, value, value.name);
    } else {
      formData.append(key, value);
    }
  }
  return formData;
}
