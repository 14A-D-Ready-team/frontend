import {
  ContainsCapitalLetter,
  ContainsLowercaseLetter,
  ContainsNumber,
  ContainsSpecialChar,
  IsValidName,
} from "@app/shared/decorators";
import { Expose } from "class-transformer";
import {
  isEmail,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

const allowedForName =
  /^[ AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóÖöŐőPpQqRrSsTtUuÚúÜüŰűVvWwXxYyZz0123456789ÂÃÄÅÆÇÈÊËÌÎÏÐÑÒÔÕØÙÛÝÞßàâãäåæçèêëìîïðñòôõøùûýþÿ]*$/;
const allowedForPassword =
  /^[ AaÁáBbCcDdEeÉéFfGgHhIiÍíJjKkLlMmNnOoÓóÖöŐőPpQqRrSsTtUuÚúÜüŰűVvWwXxYyZz0123456789ÂÃÄÅÆÇÈÊËÌÎÏÐÑÒÔÕØÙÛÝÞßàâãäåæçèêëìîïðñòôõøùûýþÿ<>#&@{};,.:_?!~'+%-=()€$ˇ^˘°˛`˙´´˝¨¸\-\[\]]*$/;

export class SignupDto {
  @Expose()
  @IsString()
  @MinLength(3, { message: "Legalább 3 betű" })
  @MaxLength(50, { message: "Kevesebbnek kell lennie, mint 50 karakter" })
  @Matches(allowedForName, { message: "Nem tartalmazhat speciális karaktert" })
  @IsValidName()
  public name!: string;

  @Expose()
  @IsString()
  @IsEmail({}, { message: "Valós email-t adjon meg" })
  @MaxLength(80)
  public email!: string;

  @Expose()
  @IsString()
  @MinLength(8, { message: "Legalább 8 karakter hoszzú" })
  @MaxLength(255, { message: "Túl sok karakter" })
  @Matches(allowedForPassword, { message: "Nem használható karakter" })
  @ContainsSpecialChar()
  @ContainsNumber()
  @ContainsCapitalLetter()
  @ContainsLowercaseLetter()
  public password!: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
