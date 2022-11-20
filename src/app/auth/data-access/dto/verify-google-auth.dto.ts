import { UserType } from "@app/user/data-access/user-type.enum";
import { Expose } from "class-transformer";
import { IsEnum, IsJWT, IsString } from "class-validator";

export class VerifyGoogleAuthDto {
  @Expose()
  @IsString()
  @IsJWT()
  public token: string;

  @Expose()
  @IsEnum(UserType)
  public userType: UserType;

  constructor(token: string, userType: UserType) {
    this.token = token;
    this.userType = userType;
  }
}
