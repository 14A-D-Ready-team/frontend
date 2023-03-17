import { registerDecorator } from "class-validator";

export function ContainsSpecialChar() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "containsSpecialChar",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: "Tartalmaznia kell speciális karaktert",
      },
      validator: {
        validate(value: string): boolean {
          const specialChars = [
            "<",
            ">",
            "#",
            "&",
            "@",
            "{",
            "}",
            ";",
            ",",
            ".",
            ":",
            "_",
            "?",
            "!",
            "~",
            "'",
            "+",
            "%",
            "-",
            "=",
            "(",
            ")",
            "€",
            "$",
            "ˇ",
            "^",
            "˘",
            "°",
            "˛",
            "`",
            "˙",
            "´",
            "´",
            "˝",
            "¨",
            "¸",
            "-",
            "[",
            "]",
          ];

          if (value === undefined) {
            return false;
          }

          let valid = false;

          const chars = Array.from(value);
          chars.forEach((char: string) => {
            if (specialChars.includes(char)) {
              valid = true;
            }
          });

          if (valid) {
            return true;
          } else {
            return false;
          }
        },
      },
    });
  };
}
