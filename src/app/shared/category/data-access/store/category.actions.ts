import { createActions } from "@shared/extended-entity-state";
import { EditCategoryDto } from "../dto";
import { Category } from "../entity";
import { FilterCategoriesQuery } from "../query";

export const EntityActions = createActions<
  Category,
  FilterCategoriesQuery,
  EditCategoryDto,
  EditCategoryDto
>("Category");

export class SetAllLoaded {
  public static readonly type = "[Category] Set All Loaded";

  constructor(public isAllLoaded: boolean) {}
}
