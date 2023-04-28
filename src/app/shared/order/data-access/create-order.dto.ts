import { Expose, Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
import { OrderedProductDto } from "./ordered-product.dto";

export class CreateOrderDto {
  @Expose()
  @IsDate()
  @IsOptional()
  public requestedPickup?: Date;

  @Expose()
  @IsString()
  @IsOptional()
  public message?: string;

  @Expose()
  @Type(() => OrderedProductDto)
  public products!: OrderedProductDto[];
}
