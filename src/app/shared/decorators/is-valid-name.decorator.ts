import { registerDecorator } from "class-validator";

export function IsValidName() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "nameNotValid",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message:
          "Nem kezdődhet, végződhet, illeve tartalmazhat 3-nál több space-t",
      },
      validator: {
        validate(value: string): boolean {
          let spaces = 0;

          if (value === undefined) {
            return false;
          }

          const chars = Array.from(value);
          chars.forEach((char: string) => {
            if (char === " ") {
              spaces++;
            }
          });

          if (chars[0] === " ") {
            return false;
          }

          if (value.includes("  ") || value.includes("   ")) {
            return false;
          }

          if (spaces > 3) {
            return false;
          } else {
            return true;
          }
        },
      },
    });
  };
}
