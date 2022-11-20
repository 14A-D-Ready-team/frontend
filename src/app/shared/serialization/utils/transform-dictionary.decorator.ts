import { Type } from "@angular/core";
import { plainToInstance, Transform } from "class-transformer";

function transformDictionary(value: any, type: Type<any>) {
  if (typeof value !== "object") {
    return {};
  }

  for (const key of Object.keys(value)) {
    const element = value[key];
    let deserialized = plainToInstance(type, element);

    switch (type) {
      case String:
        if (!(typeof deserialized === "string")) {
          deserialized = undefined;
        }
        break;

      case Number:
        if (!(typeof deserialized === "number")) {
          deserialized = undefined;
        }
        break;

      case Boolean:
        if (!(typeof deserialized === "boolean")) {
          deserialized = undefined;
        }
        break;

      default:
        if (!(deserialized instanceof type)) {
          deserialized = undefined;
        }
        break;
    }

    value[key] = deserialized;
  }

  return value;
}

export function TransformDictionary(type: Type<any>) {
  return function (target: any, property: string) {
    Transform(({ value }) => transformDictionary(value, type))(
      target,
      property,
    );
  };
}
