export interface UpdateDtoStatic<Dto, T> {
  omitUnchangedProperties(dto: Dto, entity: T): void;
  hasChanges(dto: Dto): boolean;
}
