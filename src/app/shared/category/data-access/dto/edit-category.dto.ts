import { Exclude, Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";
import { Category } from "../entity";

export class EditCategoryDto {
  @Exclude()
  public id: number;

  @Expose()
  @IsString()
  @MinLength(1, { message: "A kategória neve nem lehet üres" })
  @MaxLength(80, {
    message: "A kategória neve nem lehet hosszabb 80 karakternél",
  })
  public name: string;

  constructor(category?: Category) {
    this.id = category?.id || -1;
    this.name = category?.name || "";
  }

  public omitUnchangedProperties(original: Category) {
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = this[key] as any;
        if (key !== "id" && value === original[key as keyof typeof original]) {
          delete this[key];
        }
      }
    }
  }

  public hasChanges() {
    return Object.keys(this).filter(k => k !== "id").length > 0;
  }
}
