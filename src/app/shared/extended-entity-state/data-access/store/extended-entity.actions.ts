import * as Base from "./extended-entity.actions.base";

export function createActions<EntityType, Query, CreateDto, UpdateDto>(
  entityName: string,
) {
  class Load extends Base.Load<Query> {
    public static readonly type = `[${entityName}] Load`;
  }

  class LoadingFailed extends Base.LoadingFailed {
    public static readonly type = `[${entityName} API] Loading Failed`;
  }

  class LoadingSucceeded extends Base.LoadingSucceeded<EntityType, Query> {
    public static readonly type = `[${entityName} API] Loading Succeeded`;
  }

  class Create extends Base.Create<CreateDto> {
    public static readonly type = `[${entityName}] Create`;
  }

  class CreateFailed extends Base.CreateFailed {
    public static readonly type = `[${entityName} API] Create Failed`;
  }

  class CreateSucceeded extends Base.CreateSucceeded<EntityType> {
    public static readonly type = `[${entityName} API] Create Succeeded`;
  }

  class Update extends Base.Update<UpdateDto> {
    public static readonly type = `[${entityName}] Update`;
  }

  class UpdateFailed extends Base.UpdateFailed {
    public static readonly type = `[${entityName} API] Update Failed`;
  }

  class UpdateSucceeded extends Base.UpdateSucceeded<EntityType> {
    public static readonly type = `[${entityName} API] Update Succeeded`;
  }

  class Delete extends Base.Delete {
    public static readonly type = `[${entityName}] Delete`;
  }

  class DeleteFailed extends Base.DeleteFailed {
    public static readonly type = `[${entityName} API] Delete Failed`;
  }

  class DeleteSucceeded extends Base.DeleteSucceeded {
    public static readonly type = `[${entityName} API] Delete Succeeded`;
  }

  return {
    Load,
    LoadingFailed,
    LoadingSucceeded,
    Create,
    CreateFailed,
    CreateSucceeded,
    Update,
    UpdateFailed,
    UpdateSucceeded,
    Delete,
    DeleteFailed,
    DeleteSucceeded,
  };
}
