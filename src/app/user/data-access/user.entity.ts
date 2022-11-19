import { Expose } from "class-transformer";
import { UserType } from "./user-type.enum";

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
}
