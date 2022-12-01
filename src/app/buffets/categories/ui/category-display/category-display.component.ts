import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Category } from "@shared/category";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CategoryEditorFormModel } from "../../utils";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";

@Component({
  selector: "app-buffets-category-display",
  styleUrls: ["./category-display.component.scss"],
  templateUrl: "./category-display.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class CategoryDisplayComponent implements OnInit, OnChanges {
  @Input()
  public category!: Category;

  @Input()
  public isEditing = false;

  @Input()
  public isLoading = false;

  @Input()
  public editDisabled = false;

  @Input()
  public editorForm: FormGroup<CategoryEditorFormModel> | undefined;

  @Output()
  public editing = new EventEmitter<void>();

  @Output()
  public editingDone = new EventEmitter<boolean>();

  @Output()
  public delete = new EventEmitter<void>();

  public ngOnInit() {
    if (!this.category) {
      throw new Error("category property is required");
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.editorForm);
  }
}
