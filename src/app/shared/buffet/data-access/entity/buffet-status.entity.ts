import { Expose } from "class-transformer";
import { BuffetStatusEnum } from "../buffet-status.enum";

export class BuffetStatus {
  @Expose()
  public id!: number;

  @Expose()
  public status!: BuffetStatusEnum;

  @Expose()
  public date!: Date;

  constructor(id: number, status: BuffetStatusEnum, date: Date) {
    this.id = id;
    this.status = status;
    this.date = date;
  }
}
