import { Category } from "../entity";

export class LoadAll {
  public static readonly type = "[Category] Load All";

  // TODO: We'll load the categories of a buffet
  constructor(/* public buffetId:number */) {}
}

export class LoadingFailed {
  public static readonly type = "[Category API] Loading Failed";

  constructor(public error: any) {}
}

export class LoadingSucceeded {
  public static readonly type = "[Category API] Loading Succeeded";

  constructor(public categories: Category[]) {}
}

export class SetAllLoaded {
  public static readonly type = "[Category] Set All Loaded";

  constructor(public isAllLoaded: boolean) {}
}
