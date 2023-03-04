import { Injectable } from "@angular/core";
import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
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

    return builder.build();
  }
}
