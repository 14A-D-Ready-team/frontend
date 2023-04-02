export interface UpdateDtoStatic<Dto, T> {
  omitUnchangedProperties(dto: Dto, original: T): any;
  hasChanges(dto: Dto): boolean;
}
