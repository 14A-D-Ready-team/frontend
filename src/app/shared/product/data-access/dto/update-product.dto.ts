import { omitUnchangedProperties } from "@shared/serialization";
import { isEqualWith, omit } from "lodash";
import { Product } from "../entity";
import { CreateProductDto } from "./create-product.dto";
import { isEqual } from "lodash";
import { EditCustomizationDto } from "./edit-customization.dto";
import { OptionCount } from "../option-count.enum";
import { EditOptionDto } from "./edit-option.dto";
import { Exclude } from "class-transformer";

export class UpdateProductDto extends CreateProductDto {
  @Exclude()
  public initialImageUrl?: string;

  constructor(extisting?: Partial<UpdateProductDto>) {
    super(extisting);
  }

  public static omitUnchangedProperties(
    dto: UpdateProductDto,
    original: Product,
  ) {
    const primitives = omit(dto, "customizations", "initialImageUrl", "image");
    omitUnchangedProperties(primitives, original);

    const optionComparer = (dtoValue: any, originalValue: any) => {
      if (dtoValue instanceof EditOptionDto) {
        return (
          dtoValue.extraCost === originalValue?.extraCost &&
          dtoValue.name === originalValue?.name
        );
      }
    };

    const customizationComparer = (dtoValue: any, originalValue: any) => {
      if (dtoValue instanceof EditCustomizationDto) {
        return (
          dtoValue.description === originalValue?.description &&
          (dtoValue.isMulti
            ? originalValue?.optionCount === OptionCount.MultipleChoice
            : originalValue?.optionCount === OptionCount.SingleChoice) &&
          isEqualWith(dtoValue.options, originalValue?.options, optionComparer)
        );
      }
      return undefined;
    };

    const customizationsEqual = isEqualWith(
      dto.customizations,
      original.customizations,
      customizationComparer,
    );

    const imageChanged = !!dto.image;

    return {
      ...primitives,
      ...(customizationsEqual ? {} : { customizations: dto.customizations }),
      ...(imageChanged ? { image: dto.image } : {}),
    };
  }

  public static hasChanges(dto: UpdateProductDto) {
    return Object.keys(dto).length > 0;
  }
}
