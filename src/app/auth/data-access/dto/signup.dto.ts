import { IsValidName } from "@app/shared/decorators";
import { Expose } from "class-transformer";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

const allowedForName =
  /^[ AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóÖöŐőPpQqRrSsTtUuÚúÜüŰűVvWwXxYyZz0123456789ÂÃÄÅÆÇÈÊËÌÎÏÐÑÒÔÕØÙÛÝÞßàâãäåæçèêëìîïðñòôõøùûýþÿ]*$/;
const allowedForPassword =
  /^[ AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóÖöŐőPpQqRrSsTtUuÚúÜüŰűVvWwXxYyZz0123456789ÂÃÄÅÆÇÈÊËÌÎÏÐÑÒÔÕØÙÛÝÞßàâãäåæçèêëìîïðñòôõøùûýþÿ<>#&@{};,.:_?!~'+%-=()€$ˇ^˘°˛`˙´´˝¨¸\-\[\]]*$/;

export class SignupDto {
  @Expose()
  @IsString()
  @MinLength(3, { message: "Legalább 3 betű" })
  @MaxLength(50)
  @Matches(allowedForName)
  @IsValidName()
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
