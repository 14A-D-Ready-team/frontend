import { omitUnchangedProperties } from "@shared/serialization";
import { omit } from "lodash";
import { Product } from "../entity";
import { CreateProductDto } from "./create-product.dto";
import { isEqual } from "lodash";

export class UpdateProductDto extends CreateProductDto {
  public static omitUnchangedProperties(
    dto: UpdateProductDto,
    original: Product,
  ) {
    const primitives = omit(dto, "customizations", "image");
    omitUnchangedProperties(primitives, original);
    console.log(dto.customizations, original.customizations);
    //const customizationsChanged = isEqual(dto.customizations, original.customizations);

    return primitives;
  }

  public static hasChanges(dto: UpdateProductDto) {
    return Object.keys(dto).length > 0;
  }
}
