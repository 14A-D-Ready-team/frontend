import { Buffet } from "../entity";


export class Load {
    public static type = "[Buffet] Load";
  
    constructor() {}

    //Szűrés minta
    //constructor(public query: FilterProductsQuery) {}
  }
  
  
  export class LoadingSucceeded {
    public static type = "[Buffet API] Loading Succeeded";
  
    constructor(
      //public query: FilterProductsQuery,
      public buffets: Buffet[],
      public count: number,
    ) {}
  }
  
  export class LoadingFailed {
    public static type = "[Buffet API] Loading Failed";
  
    constructor(public error: any) {}
  }