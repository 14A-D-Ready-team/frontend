import {
  Exclude,
  Expose,
  Transform,
  TransformFnParams,
} from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { NumericFilterType } from "../numeric-filter-type.enum";

export class NumberFilterQuery {
  public static isEmpty(obj?: NumberFilterQuery) {
    return (
      // eslint-disable-next-line eqeqeq
      obj?.min == undefined && obj?.max == undefined && obj?.value == undefined
    );
  }

  public static isUnchanged(
    previous?: NumberFilterQuery,
    current?: NumberFilterQuery,
  ) {
    return (
      previous?.type !== current?.type &&
      NumberFilterQuery.isEmpty(previous) &&
      NumberFilterQuery.isEmpty(current)
    );
  }

  @Expose()
  @Transform(onlyWhenTypeMatches(NumericFilterType.Range))
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: "A minimum értéknek egész számnak kell lennie" },
  )
  public min?: number;

  @Expose()
  @Transform(onlyWhenTypeMatches(NumericFilterType.Range))
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: "A maximum értéknek egész számnak kell lennie" },
  )
  public max?: number;

  @Expose()
  @Transform(onlyWhenTypeMatches(NumericFilterType.SingleValue))
  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: "A szűrt értéknek egész számnak kell lennie" },
  )
  public value?: number;

  @Expose({ toClassOnly: true })
  public type!: NumericFilterType;
}

function onlyWhenTypeMatches(expectedType: NumericFilterType) {
  return (params: TransformFnParams) => {
    return params.obj.type === expectedType ? params.value : undefined;
  };
}
