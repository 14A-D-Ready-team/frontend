import { Injectable } from "@angular/core";
import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  MongoAbility,
} from "@casl/ability";
import { AbilityFactory, Action } from "@shared/policy/utils";
import { User } from "../data-access";

export type UserSubjects = InferSubjects<
  typeof User
  /* | typeof Customer
  | typeof BuffetWorker
  | typeof BuffetOwner
  | typeof Admin */
>;

export type UserAbility = MongoAbility<[Action, UserSubjects]>;

@Injectable()
export class UserAbilityFactory implements AbilityFactory {
  public createForUser(user?: User | undefined) {
    const builder = new AbilityBuilder<UserAbility>(createMongoAbility);

    if (!user) {
      return builder.build();
    }

    const { can } = builder;

    return builder.build({
      detectSubjectType: item => {
        console.log(item);
        return item.constructor as any;
      },
    });
  }
}
