import { Observable } from "rxjs";
import { effectMetadataKey } from "./effect-metadata.key";
import { EffectsBase } from "./effects.base";

export function Effect() {
  return function (target: EffectsBase, propertyKey: string) {
    const alreadyRegisteredEffects = Reflect.getMetadata(
      effectMetadataKey,
      target,
    ) as string[] | undefined;
    const effects = [...(alreadyRegisteredEffects || []), propertyKey];

    Reflect.defineMetadata(effectMetadataKey, effects, target);
  };
}

export function getEffects(obj: EffectsBase) {
  const properties = Reflect.getMetadata(effectMetadataKey, obj) as string[];
  return properties.map(
    property =>
      obj[property as keyof typeof obj] as unknown as Observable<unknown>,
  );
}
