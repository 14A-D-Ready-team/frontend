import { MongoAbility } from "@casl/ability";
import { User } from "@shared/user";
import { Action } from "./action.enum";

export interface AbilityFactory {
  createForUser(
    user?: User,
  ): MongoAbility<[Action, any]> | Promise<MongoAbility<[Action, any]>>;
}
