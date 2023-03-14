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
    console.log("dto");
    console.log(dto);
    console.log("original");
    console.log(original);

    const object: any = dto;
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const value = object[key] as any;
        if (key !== "id" && value === original[key as keyof typeof original]) {
          delete object[key];
        }
      }
    }
  }

  public static hasChanges(dto: EditCategoryDto) {
    return Object.keys(dto).filter(k => k !== "id").length > 0;
  }
}
