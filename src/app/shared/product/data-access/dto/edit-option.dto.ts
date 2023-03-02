import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class EditOptionDto {
  @Expose()
  @IsNotEmpty({ message: "A mező kitöltése kötelező!" })
  public name!: string;

  @Expose()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: "A mezőnek egész számnak kell lennie!" },
  )
  @Min(0, { message: "A mezőnek nemnegatív számnak kell lennie!" })
  public extraCost!: number;

  constructor(existing: Partial<EditOptionDto> = {}) {
    Object.assign(this, existing);
  }
}
