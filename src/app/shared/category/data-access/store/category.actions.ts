import { Category } from "../entity";

export class StartLoadingAll {
  public static readonly type = "[Category] Start Loading All";

  // TODO: We'll load the categories of a buffet
  constructor(/* public buffetId:number */) {}
}

export class LoadingFailed {
  public static readonly type = "[Category] Loading Failed";

  constructor(public error: any) {}
}

export class LoadingFinished {
  public static readonly type = "[Category] Loading Finished";

  constructor(public categories: Category[]) {}
}
