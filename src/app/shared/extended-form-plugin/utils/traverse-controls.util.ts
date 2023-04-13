import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

export function traverseControls(
  target: FormGroup | FormArray,
  path: string,
  cb: (control: AbstractControl | null, path: string) => any,
): void {
  Object.keys(target.controls).forEach(key => {
    const control = target.get(key);

    const prefix = path ? "." : "";
    const newPath = path + prefix + key;

    cb(control, newPath);
    if (control instanceof FormGroup || control instanceof FormArray) {
      traverseControls(control, newPath, cb);
    }
  });
}
