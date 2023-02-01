import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NgxDropzoneChangeEvent,
  NgxDropzoneComponent,
  NgxDropzoneModule,
} from "ngx-dropzone";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { mergeWith, Observable } from "rxjs";
import { DropzoneImagePreviewComponent } from "../dropzone-image-preview";
@Component({
  selector: "app-image-selector",
  standalone: true,
  imports: [
    CommonModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    DropzoneImagePreviewComponent,
  ],
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
    //this.file$ = this.bindedFormControl.valueChanges;
  }

  public onChange(event: NgxDropzoneChangeEvent) {
    const file = event.addedFiles[0];
    this.bindedFormControl.setValue(file);
  }
}
