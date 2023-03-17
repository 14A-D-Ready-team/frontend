export interface UpdateDtoStatic<Dto, T> {
  omitUnchangedProperties(dto: Dto, original: T): void;
  hasChanges(dto: Dto): boolean;
}
