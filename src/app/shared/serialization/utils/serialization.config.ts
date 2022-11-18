import { environment } from "@/environments/environment";
import { ClassTransformOptions } from "class-transformer";

export const serializationConfig: ClassTransformOptions = {
  excludeExtraneousValues: true,
  enableCircularCheck: !environment.production,
};
