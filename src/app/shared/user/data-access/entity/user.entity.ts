import { Expose } from "class-transformer";
import { UserType } from "../user-type.enum";
import { Admin } from "./admin.entity";
import { BuffetOwner } from "./buffet-owner.entity";
import { BuffetWorker } from "./buffet-worker.entity";
import { Customer } from "./customer.entity";

export class User {
  @Expose()
  public id!: number;

  @Expose()
  public type!: UserType;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public status!: number;

  @Expose()
  public admin?: Admin;

  @Expose()
  public buffetOwner?: BuffetOwner;

  @Expose()
  public buffetWorker?: BuffetWorker;

  @Expose()
  public customer?: Customer;
}
