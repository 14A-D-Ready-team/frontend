import { UserType } from "@shared/user";
import { Expose } from "class-transformer";
import { IsEnum, IsJWT, IsString } from "class-validator";

export class VerifyGoogleAuthDto {
  @Expose()
  @IsString()
  @IsJWT()
  public token: string;

  constructor(token: string) {
    this.token = token;
  }
}
