import { omitUnchangedProperties } from "@shared/serialization";
import { isEqualWith, omit } from "lodash";
import { Product } from "../entity";
import { CreateProductDto } from "./create-product.dto";
import { isEqual } from "lodash";
import { EditCustomizationDto } from "./edit-customization.dto";

export class UpdateProductDto extends CreateProductDto {
  public static omitUnchangedProperties(
    dto: UpdateProductDto,
    original: Product,
  ) {
    const primitives = omit(dto, "customizations", "image");
    omitUnchangedProperties(primitives, original);

    const customizer = (objValue: any, othValue: any) => {
      console.log(objValue);
      console.log(othValue);
      return undefined;
    };
    console.log("\n\n");
    const customizationsChanged = isEqualWith(
      dto.customizations,
      original.customizations,
      customizer,
    );

    return primitives;
  }

  public static hasChanges(dto: UpdateProductDto) {
    return Object.keys(dto).length > 0;
  }
}
