import { EntityState } from "@ngxs-labs/entity-state";

export abstract class ExtendedEntityState<
  T extends object,
> extends EntityState<T> {}
