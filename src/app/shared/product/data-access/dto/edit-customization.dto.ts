import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  IsInstance,
  ValidateNested,
  IsNotEmpty,
} from "class-validator";
import { OptionCount } from "../option-count.enum";
import { EditOptionDto } from "./edit-option.dto";

export class EditCustomizationDto {
  @Expose()
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
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
  @ValidateNested()
  public options!: EditOptionDto[];
}
