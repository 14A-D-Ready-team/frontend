import { Expose } from "class-transformer";
import { IsString, MinLength, MaxLength, IsNotEmpty } from "class-validator";

export class CreateBuffetDto {
  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  @MinLength(1, { message: "A mezőnek legalább 1 karakternek kell elnnie!" })
  @MaxLength(100, { message: "A mező legfeljebb 100 karakter hosszú lehet!" })
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public name!: string;

  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  @MinLength(1, { message: "A mezőnek legalább 1 karakternek kell elnnie!" })
  @MaxLength(100, { message: "A mező legfeljebb 100 karakter hosszú lehet!" })
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public coords!: string;

  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  @MinLength(1, { message: "A mezőnek legalább 1 karakternek kell elnnie!" })
  @MaxLength(100, { message: "A mező legfeljebb 100 karakter hosszú lehet!" })
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public address!: string;

  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  @MaxLength(300, { message: "A mező legfeljebb 200 karakter hosszú lehet!" })
  public hours?: string;

  @Expose()
  @IsString({ message: "A mező nem szöveget tartalmaz!" })
  @MaxLength(800, { message: "A mező legfeljebb 800 karakter hosszú lehet!" })
  public description?: string;
}