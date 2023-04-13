import { Injectable } from "@angular/core";
import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  MongoAbility,
} from "@casl/ability";
import { Buffet } from "@shared/buffet/data-access/entity";
import { AbilityFactory, Action } from "@shared/policy/utils";
import {
  User,
  BuffetOwner,
  BuffetWorker,
} from "@shared/user/data-access/entity";

export type BuffetSubjects = InferSubjects<typeof Buffet | "Buffet">;

export type BuffetAbility = MongoAbility<[Action, BuffetSubjects]>;

@Injectable()
export class BuffetAbilityFactory implements AbilityFactory {
  public createForUser(user?: User | undefined) {
    const builder = new AbilityBuilder<BuffetAbility>(createMongoAbility);

    const { can } = builder;

    can(Action.Read, Buffet);
    can(Action.Read, "Buffet");

    if (!user) {
      return builder.build();
    }
    const { buffetOwner, buffetWorker } = user;

    if (buffetOwner) {
      can(Action.Create, Buffet);
      can(Action.Create, "Buffet");

      can(Action.Update, Buffet, {
        buffetOwnerId: user.id,
      });
      can(Action.Delete, Buffet, {
        id: {
          $in: buffetOwner.buffetIds,
        },
      });
    }

    if (buffetWorker) {
      can(Action.Update, Buffet, {
        id: buffetWorker.buffetId,
      });
    }

    return builder.build({});
  }
}
