import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class SignupDto {
  @Expose()
  @IsString()
  public name!: string;

  @Expose()
  @IsString()
  public email!: string;

  @Expose()
  @IsString()
  public password!: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
