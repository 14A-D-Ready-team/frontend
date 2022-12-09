import { Dictionary } from "@/types";
import { TransformDictionary } from "@shared/serialization/utils/transform-dictionary.decorator";
import { Expose } from "class-transformer";
import { ApiException } from "./api.exception";

export class InvalidProperty {
  @Expose()
  @TransformDictionary(String)
  public errorMessages!: Dictionary<string>;

  @Expose()
  @TransformDictionary(InvalidProperty)
  public children!: Dictionary<InvalidProperty>;
}

export class InvalidDataException extends ApiException {
  @Expose()
  @TransformDictionary(InvalidProperty)
  public invalidProperties!: Dictionary<InvalidProperty>;
}
