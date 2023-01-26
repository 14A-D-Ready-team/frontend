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
  public categoryId!: string;

  constructor(
    id: number,
    name: string,
    description: string,
    fullPrice: number,
    discountedPrice: number,
    stock: number,
    customizations: Customization[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.fullPrice = fullPrice;
    this.discountedPrice = discountedPrice;
    this.stock = stock;
    this.customizations = customizations;
  }
}
