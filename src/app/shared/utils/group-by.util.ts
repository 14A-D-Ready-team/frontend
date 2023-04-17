import { Dictionary } from "lodash";

export function groupBy<T>(array: T[], key: keyof T): Dictionary<T> {
  const dict: Dictionary<T> = {};

  for (const item of array) {
    if (item) {
      dict[item[key] as any] = item;
    }
  }

  return dict;
}
