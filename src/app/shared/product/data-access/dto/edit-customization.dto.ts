import { Expose, Type } from "class-transformer";
import { OptionCount } from "../option-count.enum";
import { EditOptionDto } from "./edit-option.dto";

export class EditCustomizationDto {
  @Expose()
  public description!: string;

  @Expose()
  public optionCount!: OptionCount;

  @Expose()
  @Type(() => EditOptionDto)
  public options!: EditOptionDto[];
}
