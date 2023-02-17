import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from "ngx-dropzone";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { DropzoneImagePreviewComponent } from "../dropzone-image-preview";
import { IonicModule } from "@ionic/angular";
@Component({
  selector: "app-image-selector",
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    DropzoneImagePreviewComponent,
  ],
  templateUrl: "./image-selector.component.html",
  styleUrls: ["./image-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSelectorComponent implements OnInit {
  @Input()
  public bindedFormControl!: FormControl<File | null>;

  @Input()
  public initialImageUrl?: string;

  @Input()
  public label?: string;

  public ngOnInit() {
    if (!this.bindedFormControl) {
      throw new Error("bindedFormControl is required");
    }
  }

  public onChange(event: NgxDropzoneChangeEvent) {
    const file = event.addedFiles[0];
    this.bindedFormControl.setValue(file);
    this.bindedFormControl.markAsDirty();
  }
}
