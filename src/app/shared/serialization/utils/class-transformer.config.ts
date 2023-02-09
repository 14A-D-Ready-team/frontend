import { ClassTransformOptions } from "class-transformer";

export const classTransformerConfig: ClassTransformOptions = {
  excludeExtraneousValues: true,
  exposeUnsetFields: false,
};
