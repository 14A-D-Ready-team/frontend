import { Injectable } from "@angular/core";
import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  MongoAbility,
} from "@casl/ability";
import { AbilityFactory, Action } from "@shared/policy/utils";
import { User } from "@shared/user";

export type AdminSubjects = InferSubjects<"">;
/* | typeof Customer
  | typeof BuffetWorker
  | typeof BuffetOwner
  | typeof Admin */

export type AdminAbility = MongoAbility<[Action, AdminSubjects]>;

@Injectable()
export class AdminAbilityFactory implements AbilityFactory {
  public createForUser(user?: User | undefined) {
    const builder = new AbilityBuilder<AdminAbility>(createMongoAbility);

    if (!user) {
      return builder.build();
    }

    const { can } = builder;

    return builder.build();
  }
}
