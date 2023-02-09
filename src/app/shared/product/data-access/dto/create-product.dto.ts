import { classTransformerConfig } from "@shared/serialization";
import { createFormData } from "@shared/serialization/utils/create-form-data.util";
import {
  classToPlain,
  Expose,
  instanceToPlain,
  Transform,
} from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateProductDto {
  public static clone(model: CreateProductDto) {
    return { ...model };
  }

  @Expose()
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public name!: string;

  @Expose()
  @Transform(({ value }) => value)
  public image!: File;

  @Expose()
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public description!: string;

  @Expose()
  @IsPositive({ message: "A mezőnek pozitív számnak kell lennie!" })
  public fullPrice!: number;

  @Expose()
  @IsOptional()
  @IsPositive({ message: "A mezőnek pozitív számnak kell lennie!" })
  public discountedPrice!: number | null;

  @Expose()
  /* @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }) */
  @Min(0, { message: "A mezőnek 0-nál nagyobb számnak kell lennie!" })
  public stock!: number;

  @Expose()
  @IsDefined({ message: "A mező kitöltése kötelező!" })
  public categoryId!: number;
}
