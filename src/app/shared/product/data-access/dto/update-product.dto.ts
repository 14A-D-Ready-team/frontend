import { omitUnchangedProperties } from "@shared/serialization";
import { Product } from "../entity";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends CreateProductDto {
  public static omitUnchangedProperties(
    dto: UpdateProductDto,
    original: Product,
  ) {
    return omitUnchangedProperties(dto, original);
  }

  public static hasChanges(dto: UpdateProductDto) {
    return Object.keys(dto).length > 0;
  }
}
