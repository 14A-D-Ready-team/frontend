import { Expose } from "class-transformer";

export class BuffetWorker {
  @Expose()
  public buffetId!: number;
}
