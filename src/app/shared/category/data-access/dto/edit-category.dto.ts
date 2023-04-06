import { omitUnchangedProperties } from "@shared/serialization";
import { Exclude, Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Category } from "../entity";

export class EditCategoryDto {
  @Expose()
  @IsString()
  @MinLength(1, { message: "A kategória neve nem lehet üres" })
  @MaxLength(80, {
    message: "A kategória neve nem lehet hosszabb 80 karakternél",
  })
  public name: string;

  @Expose()
  public buffetId: number;

  constructor(existing: Partial<EditCategoryDto> = {}) {
    this.name = existing?.name || "";
    this.buffetId = existing?.buffetId || 0;
  }

  public static omitUnchangedProperties(
    dto: EditCategoryDto,
    original: Category,
  ) {
    omitUnchangedProperties(dto, original);
    return dto;
  }

  public static hasChanges(dto: EditCategoryDto) {
    return Object.keys(dto).length > 0;
  }
}
