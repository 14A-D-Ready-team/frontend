import { Expose } from "class-transformer";
import { OptionCount } from "../option-count.enum";
import { Option } from "./option.entity";

export class Customization {
  @Expose()
  public id!: number;

  @Expose()
  public description!: string;

  @Expose()
  public optionCount!: OptionCount;

  @Expose()
  public options!: Option[];

  constructor(
    id: number,
    description: string,
    optionCount: OptionCount,
    options: Option[],
  ) {
    this.id = id;
    this.description = description;
    this.optionCount = optionCount;
    this.options = options;
  }
}
