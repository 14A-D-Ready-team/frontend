export interface UpdateDto<T> {
  omitUnchangedProperties(entity: T): void;
  hasChanges(): boolean;
}
