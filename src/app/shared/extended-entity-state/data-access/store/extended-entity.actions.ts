import * as Base from "./extended-entity.actions.base";

export function createActions<T, Q, C, U>(entityName: string) {
  class Load extends Base.Load<Q> {
    public static readonly type = `[${entityName}] Load`;

    constructor(query: Q) {
      super(query);
    }
  }

  class LoadingFailed extends Base.LoadingFailed {
    public static readonly type = `[${entityName} API] Loading Failed`;

    constructor(error: unknown) {
      super(error);
    }
  }

  class LoadingSucceeded extends Base.LoadingSucceeded<T> {
    public static readonly type = `[${entityName} API] Loading Succeeded`;

    constructor(entities: T[]) {
      super(entities);
    }
  }

  class Create extends Base.Create<C> {
    public static readonly type = `[${entityName}] Create`;

    constructor(payload: C) {
      super(payload);
    }
  }

  class CreateFailed extends Base.CreateFailed {
    public static readonly type = `[${entityName} API] Create Failed`;

    constructor(error: any) {
      super(error);
    }
  }

  class CreateSucceeded extends Base.CreateSucceeded<T> {
    public static readonly type = `[${entityName} API] Create Succeeded`;

    constructor(entity: T) {
      super(entity);
    }
  }

  class Update extends Base.Update<U> {
    public static readonly type = `[${entityName}] Update`;

    constructor(payload: U) {
      super(payload);
    }
  }

  class UpdateFailed extends Base.UpdateFailed {
    public static readonly type = `[${entityName} API] Update Failed`;

    constructor(error: any) {
      super(error);
    }
  }

  class UpdateSucceeded extends Base.UpdateSucceeded<T> {
    public static readonly type = `[${entityName} API] Update Succeeded`;

    constructor(entity: T) {
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
