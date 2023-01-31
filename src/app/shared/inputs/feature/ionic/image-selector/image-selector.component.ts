import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxDropzoneModule } from "ngx-dropzone";
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from "@angular/forms";

@Component({
  selector: "app-image-selector",
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, ReactiveFormsModule],
  templateUrl: "./image-selector.component.html",
  styleUrls: ["./image-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSelectorComponent {
  public form: UntypedFormGroup = new UntypedFormGroup({
    images: new UntypedFormControl(),
  });

  constructor() {
    this.form.valueChanges.subscribe({
      next: () => {
        console.log(this.form);
      },
    });
  }
}
