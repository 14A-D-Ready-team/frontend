import { instanceToPlain } from "class-transformer";
import { classTransformerConfig } from "./class-transformer.config";

export function serializeFormData(data: any) {
  const formData = new FormData();
  for (const key of Object.keys(data)) {
    const value = data[key];
    if (value instanceof File) {
      formData.append(key, value, value.name);
    }
  }

  const plain = instanceToPlain(data, classTransformerConfig);

  for (const key of Object.keys(plain)) {
    formData.append(key, plain[key]);
  }

  return formData;
}
