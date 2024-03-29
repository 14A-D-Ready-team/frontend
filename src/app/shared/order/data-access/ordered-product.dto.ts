import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export class OrderedProductDto {
  @Expose()
  @IsNumber()
  public productId!: number;

  @Expose()
  @IsNumber()
  public amount!: number;

  @Expose()
  @IsNumber({}, { each: true })
  public selectedOptionIds!: number[];

  constructor(productId: number, amount: number, selectedOptionIds: number[]) {
    this.productId = productId;
    this.amount = amount;
    this.selectedOptionIds = selectedOptionIds;
  }
}
