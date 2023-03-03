export type PolicyHandler = (
  ability: AppAbility,
  route: ActivatedRouteSnapshot,
) => boolean | UrlTree;
