import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class LoginDto {
  @Expose()
  @IsString()
  public email!: string;

  @Expose()
  @IsString()
  public password!: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
