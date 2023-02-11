import { instanceToPlain } from "class-transformer";
import { classTransformerConfig } from "./class-transformer.config";

export function serializeFormData(data: any) {
  console.log(data);
  const formData = new FormData();
  for (const key of Object.keys(data)) {
    const value = data[key];
    if (value instanceof File) {
      formData.append(key, value, value.name);
    }
  }

  const plain = instanceToPlain(data, classTransformerConfig);
  console.log(plain);

  for (const key of Object.keys(plain)) {
    formData.append(key, plain[key]);
  }

  return formData;
}
