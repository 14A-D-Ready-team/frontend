import { Expose } from "class-transformer";
import { Customization } from "./customization.entity";

export class Product {
  @Expose()
  public id!: number;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public fullPrice!: number;

  @Expose()
  public discountedPrice?: number;

  @Expose()
  public stock!: number;

  @Expose()
  public customizations!: Customization[];

  @Expose()
  public categoryId!: number;
}
