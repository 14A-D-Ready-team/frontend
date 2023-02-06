import * as Base from "./extended-entity.actions.base";

export function createActions<EntityType, Query, CreateDto, UpdateDto>(
  entityName: string,
) {
  class Load extends Base.Load<Query> {
    public static readonly type = `[${entityName}] Load`;

    constructor(query: Query) {
      super(query);
    }
  }

  class LoadingFailed extends Base.LoadingFailed {
    public static readonly type = `[${entityName} API] Loading Failed`;

    constructor(error: unknown) {
      super(error);
    }
  }

  class LoadingSucceeded extends Base.LoadingSucceeded<EntityType> {
    public static readonly type = `[${entityName} API] Loading Succeeded`;

    constructor(entities: EntityType[]) {
      super(entities);
    }
  }

  class Create extends Base.Create<CreateDto> {
    public static readonly type = `[${entityName}] Create`;

    constructor(payload: CreateDto) {
      super(payload);
    }
  }

  class CreateFailed extends Base.CreateFailed {
    public static readonly type = `[${entityName} API] Create Failed`;

    constructor(error: any) {
      super(error);
    }
  }

  class CreateSucceeded extends Base.CreateSucceeded<EntityType> {
    public static readonly type = `[${entityName} API] Create Succeeded`;

    constructor(entity: EntityType) {
      super(entity);
    }
  }

  class Update extends Base.Update<UpdateDto> {
    public static readonly type = `[${entityName}] Update`;

    constructor(payload: UpdateDto) {
      super(payload);
    }
  }

  class UpdateFailed extends Base.UpdateFailed {
    public static readonly type = `[${entityName} API] Update Failed`;

    constructor(error: any) {
      super(error);
    }
  }

  class UpdateSucceeded extends Base.UpdateSucceeded<EntityType> {
    public static readonly type = `[${entityName} API] Update Succeeded`;

    constructor(entity: EntityType) {
      super(entity);
    }
  }

  class Delete extends Base.Delete {
    public static readonly type = `[${entityName}] Delete`;

    constructor(id: number) {
      super(id);
    }
  }

  class DeleteFailed extends Base.DeleteFailed {
    public static readonly type = `[${entityName} API] Delete Failed`;

    constructor(error: any) {
      super(error);
    }
  }

  class DeleteSucceeded extends Base.DeleteSucceeded {
    public static readonly type = `[${entityName} API] Delete Succeeded`;

    constructor(id: number) {
      super(id);
    }
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
