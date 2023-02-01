import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from "ngx-dropzone";
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
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
  @Input()
  public bindedFormControl!: FormControl<File | null>;

  @Input()
  public initialImageUrl?: string;

  constructor() {
    if (!this.bindedFormControl) {
      throw new Error("bindedFormControl is required");
    }
  }

  public onChange(event: NgxDropzoneChangeEvent) {
    const file = event.addedFiles[0];
    this.bindedFormControl.setValue(file);
  }
}
