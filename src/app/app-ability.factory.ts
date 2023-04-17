import { Injectable, Injector } from "@angular/core";
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  MongoAbility,
  MongoQuery,
  SubjectRawRule,
} from "@casl/ability";
import { ProductSubjects } from "@shared/product";
import { User, UserSubjects } from "@shared/user";
import { AbilityFactory, ABILITY_FACTORY, Action } from "@shared/policy";
import { map } from "p-iteration";
import { CategorySubjects } from "@shared/category/utils";
import { BuffetSubjects } from "@shared/buffet/utils";

type AppSubjects =
  | "all"
  | UserSubjects
  | BuffetSubjects
  | ProductSubjects
  | CategorySubjects;

export type AppAbility = MongoAbility<[Action, AppSubjects]>;

@Injectable()
export class AppAbilityFactory implements AbilityFactory {
  constructor(private injector: Injector) {}

  public createForUser(user?: User) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (!user) {
      return this.buildAbility(builder);
    }

    const { can } = builder;

    if (user.admin) {
      can(Action.Manage, "all");
    }

    return this.buildAbility(builder, user);
  }

  private async buildAbility(builder: AbilityBuilder<AppAbility>, user?: User) {
    const { build, rules } = builder;

    rules.push(...(await this.getExtensionRules(user)));

    return build({
      detectSubjectType: item => {
        console.log(item);
        return item.constructor as ExtractSubjectType<AppAbility>;
      },
    });
  }

  private async getExtensionRules(user: User | undefined) {
    const factories = this.injector.get<AbilityFactory[]>(ABILITY_FACTORY);

    const extensionRules = await map(
      factories,
      async factory => (await factory.createForUser(user)).rules,
    );

    let flattenedRules: SubjectRawRule<Action, any, MongoQuery<any>>[] = [];
    flattenedRules = flattenedRules.concat(...extensionRules);
    return flattenedRules;
  }
}
