import { Expose } from "class-transformer";
import { EditCustomizationDto, UpdateProductDto } from "../dto";
import { Customization } from "./customization.entity";
import { OptionCount } from "../option-count.enum";
import { environment } from "@/environments/environment";

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

  public static toDto(product: Product): UpdateProductDto {
    const customizations = product.customizations.map(
      c =>
        new EditCustomizationDto({
          description: c.description,
          isMulti: c.optionCount === OptionCount.MultipleChoice,
          options: c.options,
        }),
    );

    return new UpdateProductDto({
      ...product,
      customizations,
      initialImageUrl:
        environment.api.url + "/product/" + product.id + "/image",
      image: null as any,
    });
  }

  constructor(data: Partial<Product> = {}) {
    // we might want to clone customizations here
    Object.assign(this, data);
  }
}
