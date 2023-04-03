import { Expose } from "class-transformer";
import { EditCustomizationDto, UpdateProductDto } from "../dto";
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

  @Expose()
  public buffetId!: number;

  public toDto(): UpdateProductDto {
    const customizations = this.customizations.map(
      c => new EditCustomizationDto({ description: c.description }),
    );
  }
}
