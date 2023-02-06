export abstract class Load<Q> {
  constructor(public query: Q) {}
}

export abstract class LoadingFailed {
  constructor(public error: any) {}
}

export abstract class LoadingSucceeded<T> {
  constructor(public entities: T[]) {}
}

export abstract class Create<C> {
  constructor(public payload: C) {}
}

export abstract class CreateFailed {
  constructor(public error: any) {}
}

export abstract class CreateSucceeded<T> {
  constructor(public entity: T) {}
}

export abstract class Update<U> {
  constructor(public payload: U) {}
}

export abstract class UpdateFailed {
  constructor(public error: any) {}
}

export abstract class UpdateSucceeded<T> {
  constructor(public entity: T) {}
}

export abstract class Delete {
  constructor(public id: number) {}
}

export abstract class DeleteFailed {
  constructor(public error: any) {}
}

export abstract class DeleteSucceeded {
  constructor(public id: number) {}
}
