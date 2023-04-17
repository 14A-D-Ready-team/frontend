import { Injectable } from "@angular/core";
import {
  AbilityBuilder,
  createMongoAbility,
  InferSubjects,
  MongoAbility,
} from "@casl/ability";
import { Category } from "@shared/category";
import { AbilityFactory, Action } from "@shared/policy/utils";
import { User } from "@shared/user";

export type CategorySubjects = InferSubjects<typeof Category>;

export type CategoryAbility = MongoAbility<[Action, CategorySubjects]>;

@Injectable()
export class CategoryAbilityFactory implements AbilityFactory {
  public createForUser(user?: User | undefined) {
    const builder = new AbilityBuilder<CategoryAbility>(createMongoAbility);

    if (!user) {
      return builder.build();
    }

    const { can } = builder;

    can(Action.Read, Category);

    if (user?.buffetOwner) {
      builder.can([Action.Create, Action.Update, Action.Delete], Category, {
        buffetId: { $in: user.buffetOwner.buffetIds },
      });
    }

    if (user?.buffetWorker) {
      builder.can([Action.Create, Action.Update, Action.Delete], Category, {
        buffetId: user.buffetWorker.buffetId,
      });
    }

    return builder.build({
      detectSubjectType: item => {
        console.log(item);
        return item.constructor as any;
      },
    });
  }
}
