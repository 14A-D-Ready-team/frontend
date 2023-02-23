import { registerDecorator } from "class-validator";

export function ContainsCapitalLetter() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "containsCapitalLetter",
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: "Tartalmaznia kell nagybetűt",
      },
      validator: {
        validate(value: string): boolean {
          const letters = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "À",
            "Á",
            "Â",
            "Ã",
            "Ä",
            "Å",
            "Æ",
            "Ç",
            "È",
            "É",
            "Ê",
            "Ë",
            "Ì",
            "Í",
            "Î",
            "Ï",
            "Ð",
            "Ñ",
            "Ò",
            "Ó",
            "Ô",
            "Õ",
            "Ö",
            "Ø",
            "Ù",
            "Ú",
            "Û",
            "Ü",
            "Ý",
            "Þ",
            "ß",
            "Ő",
            "Ű",
          ];

          if (value === undefined) {
            return false;
          }

          let valid = false;

          const chars = Array.from(value);
          chars.forEach((char: string) => {
            if (letters.includes(char)) {
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
