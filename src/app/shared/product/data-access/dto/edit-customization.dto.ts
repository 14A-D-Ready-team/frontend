import { Exclude, Expose, Transform, Type } from "class-transformer";
import { OptionCount } from "../option-count.enum";
import { EditOptionDto } from "./edit-option.dto";

export class EditCustomizationDto {
  @Expose()
  public description!: string;

  @Exclude()
  public isMulti!: boolean;

  @Expose()
  @Transform(({ obj }) =>
    obj.isMulti ? OptionCount.MultipleChoice : OptionCount.SingleChoice,
  )
  public optionCount!: OptionCount;

  @Expose()
  @Type(() => EditOptionDto)
  public options!: EditOptionDto[];
}
