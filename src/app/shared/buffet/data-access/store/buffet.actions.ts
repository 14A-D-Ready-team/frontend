import { EntityActions } from "@shared/extended-entity-state";
import { CreateBuffetDto, UpdateBuffetDto } from "../dto";
import { Buffet } from "../entity";
import { SearchBuffetsQuery } from "../query";

export class Load extends EntityActions.Load<SearchBuffetsQuery> {
  public static readonly type = `[Buffet] Load`;
}

export class LoadingFailed extends EntityActions.LoadingFailed {
  public static readonly type = `[Buffet API] Loading Failed`;
}

export class LoadingSucceeded extends EntityActions.LoadingSucceeded<
  Buffet,
  SearchBuffetsQuery
> {
  public static readonly type = `[Buffet API] Loading Succeeded`;
}

export class Create extends EntityActions.Create<CreateBuffetDto> {
  public static readonly type = `[Buffet] Create`;
}

export class CreateFailed extends EntityActions.CreateFailed {
  public static readonly type = `[Buffet API] Create Failed`;
}

export class CreateSucceeded extends EntityActions.CreateSucceeded<Buffet> {
  public static readonly type = `[Buffet API] Create Succeeded`;
}

export class Update extends EntityActions.Update<UpdateBuffetDto> {
  public static readonly type = `[Buffet] Update`;
}

export class UpdateFailed extends EntityActions.UpdateFailed {
  public static readonly type = `[Buffet API] Update Failed`;
}

export class UpdateSucceeded extends EntityActions.UpdateSucceeded<Buffet> {
  public static readonly type = `[Buffet API] Update Succeeded`;
}

export class Delete extends EntityActions.Delete {
  public static readonly type = `[Buffet] Delete`;
}

export class DeleteFailed extends EntityActions.DeleteFailed {
  public static readonly type = `[Buffet API] Delete Failed`;
}

export class DeleteSucceeded extends EntityActions.DeleteSucceeded {
  public static readonly type = `[Buffet API] Delete Succeeded`;
}
export class SetAllLoaded {
  public static readonly type = "[Buffet] Set All Loaded";

  constructor(public isAllLoaded: boolean) {}
}
