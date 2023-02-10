import { Buffet } from "../entity";
import { SearchBuffetsQuery } from "../query";


export class Load {
    public static type = "[Buffet] Load";
  
    constructor(public query: SearchBuffetsQuery) {}
  }
  
  
  export class LoadingSucceeded {
    public static type = "[Buffet API] Loading Succeeded";
  
    constructor(
      public query: SearchBuffetsQuery,
      public buffets: Buffet[],
      public count: number,
    ) {}
  }
  
  export class LoadingFailed {
    public static type = "[Buffet API] Loading Failed";
  
    constructor(public error: any) {}
  }