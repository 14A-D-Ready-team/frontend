type Callback = (value: object | any[], path: string) => void;

export function traverseObject(object: object, callback: Callback): void {
  const queue = [{ object, path: "" }];
  while (queue.length) {
    const { object: obj, path } = queue.shift()!;

    if (Array.isArray(obj)) {
      obj.forEach((value, index) => {
        const nextPath = path ? `${path}.${index}` : index.toString();

        if (typeof value === "object" && value !== null) {
          callback(value, `${nextPath}`);
          queue.push({ object: value, path: nextPath });
        }
      });
    } else {
      Object.keys(obj).forEach(key => {
        const nextPath = path ? `${path}.${key}` : key;
        const value = obj[key as keyof typeof obj];
        if (typeof value === "object" && value !== null) {
          callback(value, `${nextPath}`);
          queue.push({ object: value, path: nextPath });
        }
      });
    }
  }
}
