import { Injectable } from "@angular/core";
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  ExtractSubjectType,
} from "@casl/ability";
import { InferSubjects } from "@casl/ability/dist/types/types";
import { AbilityFactory, Action } from "@shared/policy";
import { User } from "@shared/user";
import { Product } from "../data-access";

export type ProductSubjects = InferSubjects<typeof Product>;

export type ProductAbility = MongoAbility<[Action, ProductSubjects]>;

@Injectable()
export class ProductAbilityFactory implements AbilityFactory {
  public createForUser(user?: User | undefined) {
    const builder = new AbilityBuilder<ProductAbility>(createMongoAbility);
    const { can } = builder;

    can(Action.Read, Product);

    if (!user) {
      return builder.build();
    }

    if (user.buffetOwner) {
      can(Action.Create, Product, {
        buffetId: { $in: user.buffetOwner.buffetIds },
      });
      can(Action.Update, Product, {
        buffetId: { $in: user.buffetOwner.buffetIds },
      });
      can(Action.Delete, Product, {
        buffetId: { $in: user.buffetOwner.buffetIds },
      });
    }

    if (user.buffetWorker) {
      can([Action.Create, Action.Update, Action.Delete], Product, {
        buffetId: user.buffetWorker.buffetId,
      });
    }

    return builder.build();
  }
}
