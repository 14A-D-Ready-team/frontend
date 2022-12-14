import { Expose } from "class-transformer";
import { OptionCount } from "../option-count.enum";
import { Option } from "./option.entity";
import { Product } from "./product.entity";

export class Customization {
  @Expose()
  public id!: number;

  @Expose()
  public description!: string;

  @Expose()
  public optionCount!: OptionCount;

  @Expose()
  public options!: Option[];
}
