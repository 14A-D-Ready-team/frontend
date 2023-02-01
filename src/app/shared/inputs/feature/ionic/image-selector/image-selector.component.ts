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
})
export class ImageSelectorComponent implements OnInit {
  @Input()
  public bindedFormControl!: FormControl<File | null>;

  @Input()
  public initialImageUrl?: string;

  public ngOnInit() {
    if (!this.bindedFormControl) {
      throw new Error("bindedFormControl is required");
    }
  }

  public onChange(event: NgxDropzoneChangeEvent) {
    console.log(event);
    const file = event.addedFiles[0];
    this.bindedFormControl.setValue(file);
    console.log(this.bindedFormControl);
  }
}
