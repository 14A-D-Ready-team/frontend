import { Expose } from "class-transformer";
import { IsString, MinLength, MaxLength, IsNotEmpty } from "class-validator";

export class CreateBuffetDto {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public name!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public coords!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public address!: string;

  @Expose()
  @IsString()
  @MaxLength(200)
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public hours!: string;

  @Expose()
  @IsString()
  @MaxLength(800)
  public description?: string;
}