import { Exclude, Expose } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
} from "class-validator";

export class CreateProductDto {
  public static clone(dto: CreateProductDto) {
    return new CreateProductDto(dto);
  }

  @Expose()
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public name!: string;

  @Exclude()
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

  constructor(model?: Partial<CreateProductDto>) {
    Object.assign(this, model);
  }
}
