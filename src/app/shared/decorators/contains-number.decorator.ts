import { registerDecorator } from "class-validator";

export function ContainsNumber() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "containsNumber",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: "Tartalmaznia kell számot",
      },
      validator: {
        validate(value: string): boolean {
          const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

          if (value === undefined) {
            return false;
          }

          let valid = false;

          const chars = Array.from(value);
          chars.forEach((char: string) => {
            if (numbers.includes(char)) {
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
