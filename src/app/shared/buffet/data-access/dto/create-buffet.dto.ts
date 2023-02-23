import { Exclude, Expose } from "class-transformer";
import { IsString, MinLength, MaxLength, IsNotEmpty } from "class-validator";

export class CreateBuffetDto {
  public static clone(dto: CreateBuffetDto) {
    return new CreateBuffetDto(dto);
  }

  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public name!: string;

  @Exclude()
  public image!: File;

  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public coords!: string;

  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public address!: string;

  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  public hours?: string;

  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  public description?: string;

  constructor(model?: Partial<CreateBuffetDto>) {
    Object.assign(this, model);
  }
}