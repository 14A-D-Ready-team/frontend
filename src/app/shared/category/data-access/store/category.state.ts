import {
  defaultEntityState,
  EntityStateModel,
  EntityState,
  IdStrategy,
} from "@ngxs-labs/entity-state";
import { State, StateToken } from "@ngxs/store";
import { Category } from "../entity";

export const CATEGORY_STATE_TOKEN = new StateToken<EntityStateModel<Category>>(
  "category",
);

@State<EntityStateModel<Category>>({
  name: CATEGORY_STATE_TOKEN,
  defaults: defaultEntityState(),
})
export class CategoryState extends EntityState<Category> {
  constructor() {
    super(CategoryState, "id", IdStrategy.EntityIdGenerator);
  }
}
